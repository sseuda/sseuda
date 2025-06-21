package com.sseuda.sseuda_server.function.comment.service;

import com.sseuda.sseuda_server.function.alarm.dao.AlarmMapper;
import com.sseuda.sseuda_server.function.alarm.dto.AlarmDTO;
import com.sseuda.sseuda_server.function.comment.dao.CommentMapper;
import com.sseuda.sseuda_server.function.comment.dto.CommentDTO;
import com.sseuda.sseuda_server.function.post.dao.PostMapper;
import com.sseuda.sseuda_server.function.post.dto.PostDTO;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final Logger log = LoggerFactory.getLogger(CommentService.class);
    private final CommentMapper commentMapper;
    private final AlarmMapper alarmMapper;
    private final PostMapper postMapper;

    public List<CommentDTO> findPostComment(int postId) {
        return commentMapper.findPostComment(postId);
    }

    @Transactional
    public int insertComment(CommentDTO dto, int userCode, int postId) {

        System.out.println("댓글서비스 등록 시작?");

        // 1. DTO에 postId 세팅 (필수)
        dto.setPostId(postId);
        System.out.println("postId: " + postId);

        // 2. Map 생성
        Map<String, Object> commentMap = new HashMap<>();
        commentMap.put("dto", dto);
        commentMap.put("userCode", userCode);
        System.out.println("commentMap: " + commentMap);
        System.out.println("dto: " + dto);
        System.out.println("userCode: " + userCode);

        // 3. 댓글 등록 (commentId가 paramMap에 담김)
        commentMapper.insertComment(commentMap);
        System.out.println("commentMap222: " + commentMap);

        Integer commentId = (Integer) commentMap.get("commentId");
        System.out.println("commentId: " + commentId);
        if (commentId == null) {
            throw new RuntimeException("댓글 ID 생성 실패");
        }

        // 4. 게시글 작성자 조회
        List<PostDTO> postList = postMapper.findPost(postId);
        System.out.println("postList: " + postList);
        if (postList.isEmpty()) {
            throw new RuntimeException("해당 게시글이 존재하지 않습니다.");
        }

        int receiverId = postList.get(0).getUserId();
        System.out.println("receiverId: " + receiverId);
        System.out.println("userCode?????????? " + userCode);

        // 5. 본인 댓글이면 알림 생성 생략
        if (receiverId != userCode) {
            AlarmDTO alarmDTO = new AlarmDTO();
            alarmDTO.setAlarmType("COMMENT");
            alarmDTO.setUserId(receiverId);
            alarmDTO.setPostId(postId);
            alarmDTO.setCommentId(commentId);
            alarmMapper.insertAlarmForComment(alarmDTO);
            System.out.println("alarmDTO: " + alarmDTO);
        }

        System.out.println("commentId: " + commentId);
        return commentId;
    }

    @Transactional
    public int updateComment(CommentDTO dto, int userCode, int commentId) {
        return commentMapper.updateComment(dto, userCode, commentId);
    }

    @Transactional
    public int deleteComment(CommentDTO dto, int userCode, int commentId) {
        return commentMapper.deleteComment(dto, userCode, commentId);
    }
}

