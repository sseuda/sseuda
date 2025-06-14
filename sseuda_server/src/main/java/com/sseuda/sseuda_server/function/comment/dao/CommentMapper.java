package com.sseuda.sseuda_server.function.comment.dao;

import com.sseuda.sseuda_server.function.comment.dto.CommentDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {

    List<CommentDTO> findPostComment(int postId);

    int insertComment(CommentDTO dto, int userCode, int postId);

    int updateComment(CommentDTO dto, int userCode, int commentId);

    int deleteComment(CommentDTO dto, int userCode, int commentId);
}
