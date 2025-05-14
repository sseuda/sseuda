package com.sseuda.sseuda_server.function.post.service;

import com.sseuda.sseuda_server.function.post.dao.PostMapper;
import com.sseuda.sseuda_server.function.post.dto.PostDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private static final Logger log = LoggerFactory.getLogger(PostService.class);
    private final PostMapper postMapper;

    @Autowired
    public PostService(PostMapper postMapper) {
        this.postMapper = postMapper;
    }

//    게시글 전체 조회
    public List<PostDTO> findPostList(){

        return postMapper.findPostList();
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
    public List<PostDTO> findUserCategoryPostList(int userCode, int bigCategoryId, int smallCategoryId) {

        return postMapper.findUserCategoryPostList(userCode, bigCategoryId, smallCategoryId);
    }

//  회원별 게시글 삭제
    public int deleteUserPosting(PostDTO post, int userCode, int postId) {

        return postMapper.deleteUserPosting(post, userCode, postId);
    }
}
