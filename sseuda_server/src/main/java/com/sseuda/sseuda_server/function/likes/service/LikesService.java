package com.sseuda.sseuda_server.function.likes.service;

import com.sseuda.sseuda_server.function.alarm.dao.AlarmMapper;
import com.sseuda.sseuda_server.function.alarm.dto.AlarmDTO;
import com.sseuda.sseuda_server.function.likes.dao.LikesMapper;
import com.sseuda.sseuda_server.function.likes.dto.LikesDTO;
import com.sseuda.sseuda_server.function.post.dao.PostMapper;
import com.sseuda.sseuda_server.function.post.dto.PostDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LikesService {

    private final LikesMapper likesMapper;
    private final PostMapper postMapper;
    private final AlarmMapper alarmMapper;

    @Autowired
    public LikesService(LikesMapper likesMapper, PostMapper postMapper, AlarmMapper alarmMapper) {
        this.likesMapper = likesMapper;
        this.postMapper = postMapper;
        this.alarmMapper = alarmMapper;
    }

    public List<LikesDTO> findLikesList(int postId) {

        return likesMapper.findLikesList(postId);
    }

    public List<LikesDTO> findLikes(int postId) {

        return likesMapper.findLikes(postId);
    }

    public List<LikesDTO> userLike(int userCode, int postId) {

        return likesMapper.userLike(userCode, postId);
    }

    public List<LikesDTO> userLikesList(int userCode) {

        return likesMapper.userLikesList(userCode);
    }

    //    배너 조회
    public List<LikesDTO> findBannerLikeList(){

        return likesMapper.findBannerLikeList();
    }

    @Transactional
    public int insertLike(int postId, int userCode, LikesDTO dto) {

        System.out.println("좋아요 서비스 시작");

        // DTO에 postId 세팅
        dto.setPostId(postId);
        System.out.println("postId: " + postId);

        // Map 생성
        Map<String, Object> likeMap = new HashMap<>();
        likeMap.put("userCode", userCode);
        likeMap.put("dto", dto);

        // insert 실행
        likesMapper.insertLike(likeMap);
        System.out.println("insert 후 likeMap: " + likeMap);

        // insert 후 likesId 얻기
        Integer likesId = (Integer) likeMap.get("likesId");
        System.out.println("likesId: " + likesId);
        if (likesId == null || likesId == 0) {
            throw new RuntimeException("좋아요 ID 생성 실패!");
        }

        // 게시글 존재 여부 확인
        List<PostDTO> postList = postMapper.findPost(postId);
        if (postList.isEmpty()) {
            throw new RuntimeException("해당 게시글이 존재하지 않습니다.");
        }

        int receiveId = postList.get(0).getUserId();
        System.out.println("받는 사람 ID (게시글 작성자): " + receiveId);

        // 알림 생성
        if (receiveId != userCode) {
            AlarmDTO alarmDTO = new AlarmDTO();
            alarmDTO.setAlarmType("LIKE");
            alarmDTO.setUserId(receiveId);
            alarmDTO.setPostId(postId);
            alarmDTO.setLikesId(likesId);
            alarmMapper.insertAlarmForLike(alarmDTO);
            System.out.println("alarmDTO: " + alarmDTO);
        }

        // 결과로 1 리턴 (insert 성공 시)
        return 1;
    }

    @Transactional
    public int deleteLike(int postId, int userCode) {

        return likesMapper.deleteLike(postId, userCode);
    }


}
