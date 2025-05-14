package com.sseuda.sseuda_server.function.post.dao;

import com.sseuda.sseuda_server.function.post.dto.PostDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostMapper {

//    게시글 전체 조회
    List<PostDTO> findPostList();

//    카테고리별 게시글 전체 조회
    List<PostDTO> findCategoryPostList(int bigCategoryId, int smallCategoryId);

//    회원별 게시글 전체 조회
    List<PostDTO> findUserPostList(int userCode);

//    회원별 카테고리 게시글 전체 조회
    List<PostDTO> findUserCategoryPostList(int userCode, int bigCategoryId, int smallCategoryId);

}
