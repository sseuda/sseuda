package com.sseuda.sseuda_server.function.post.dao;

import com.sseuda.sseuda_server.function.post.dto.PostDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostMapper {

//    게시글 전체 조회
    List<PostDTO> findPostList();

//    회원별 게시글 전체 조회
//    List<PostDTO> findUserPostList(int userCode);
}
