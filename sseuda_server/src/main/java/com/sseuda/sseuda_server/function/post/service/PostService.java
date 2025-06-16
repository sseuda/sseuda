package com.sseuda.sseuda_server.function.post.service;

import com.sseuda.sseuda_server.function.member.dao.MemberMapper;
import com.sseuda.sseuda_server.function.member.dto.MemberDTO;
import com.sseuda.sseuda_server.function.post.dao.PostMapper;
import com.sseuda.sseuda_server.function.post.dto.PostDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PostService {

    private static final Logger log = LoggerFactory.getLogger(PostService.class);
    private final PostMapper postMapper;
    private final MemberMapper memberMapper;

    @Autowired
    public PostService(PostMapper postMapper, MemberMapper memberMapper) {
        this.postMapper = postMapper;
        this.memberMapper = memberMapper;
    }

//    게시글 전체 조회
    public List<PostDTO> findPostList(){

        return postMapper.findPostList();
    }

//    게시글 상세 조회
    public List<PostDTO> findPost(int postId) {

        return postMapper.findPost(postId);
    }

//    카테고리별 게시글 전체 조회
    public List<PostDTO> findCategoryPostList(int bigCategoryId, int smallCategoryId) {

        return postMapper.findCategoryPostList(bigCategoryId, smallCategoryId);
    }

//    회원별 게시글 전체 조회
    public  List<PostDTO> findUserPostList(int userCode){

        return postMapper.findUserPostList(userCode);
    }

//    카테고리별 게시글 전체 조회
    public List<PostDTO> findUserCategoryPostList(int userCode, int smallCategoryId) {

        return postMapper.findUserCategoryPostList(userCode, smallCategoryId);
    }

    // 검색용
    public List<PostDTO> searchPosts(String keyword) {
        String[] keywords = keyword.trim().split("\\s+");
        return postMapper.searchPosts(keywords);
    }

//    회원별 게시글 등록
    @Transactional
    public int saveUserPosting(PostDTO dto, int userCode) {

        return postMapper.saveUserPosting(dto, userCode);
    }

//    회원별 게시글 수정
    @Transactional
    public int updateUserPosting(PostDTO dto) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("postTitle", dto.getPostTitle());
        paramMap.put("postContent", dto.getPostContent());
        paramMap.put("smallCategoryId", dto.getSmallCategoryId());

        paramMap.put("userCode", dto.getUserId());
        paramMap.put("postId", dto.getPostId());

        return postMapper.updateUserPosting(paramMap);
    }

//  회원별 게시글 삭제
    @Transactional
    public int deleteUserPosting(int postId, int userCode) {
        Map<String, Object> map = new HashMap<>();
        map.put("postId", postId);
        map.put("userCode", userCode);
        return postMapper.deleteUserPosting(map);
    }


//    게시물별 조회수 증가
    public List<PostDTO> viewCountUpdate() {

        return postMapper.viewCountUpdate();
    }
}
