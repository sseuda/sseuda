package com.sseuda.sseuda_server.function.post.service;

import com.sseuda.sseuda_server.function.member.dao.MemberMapper;
import com.sseuda.sseuda_server.function.member.dto.MemberDTO;
import com.sseuda.sseuda_server.function.post.dao.PostMapper;
import com.sseuda.sseuda_server.function.post.dto.PostDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

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

        return postMapper.searchPosts(keyword);
    }

//    회원별 게시글 등록
    public void saveUserPosting(PostDTO dto, int userCode) {
//
//        String username = memberMapper.findUsernameByUserId(dto.getUserId());
//
//        MemberDTO memberDTO = new MemberDTO();
//        memberDTO.setUsername(username);
//        dto.setMemberDTO(memberDTO);

        postMapper.saveUserPosting(dto, userCode);
    }

//  회원별 게시글 삭제
    public int deleteUserPosting(PostDTO post, int userCode, int postId) {

        return postMapper.deleteUserPosting(post, userCode, postId);
    }



}
