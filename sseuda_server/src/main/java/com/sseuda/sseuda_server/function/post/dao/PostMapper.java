package com.sseuda.sseuda_server.function.post.dao;

import com.sseuda.sseuda_server.function.post.dto.PostDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostMapper {

    List<PostDTO> findPostList();
}
