package com.sseuda.sseuda_server.function.comment.service;

import com.sseuda.sseuda_server.function.comment.dao.CommentMapper;
import com.sseuda.sseuda_server.function.comment.dto.CommentDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentService {

    private final Logger log = LoggerFactory.getLogger(CommentService.class);
    private CommentMapper commentMapper;

    @Autowired
    public CommentService(CommentMapper commentMapper) {
        this.commentMapper = commentMapper;
    }

    public List<CommentDTO> findPostComment(int postId) {

        return commentMapper.findPostComment(postId);
    }

    @Transactional
    public int insertComment(CommentDTO dto, int userCode, int postId) {

        return commentMapper.insertComment(dto, userCode, postId);
    }

    @Transactional
    public int updateComment(CommentDTO dto, int userCode, int postId) {

        return commentMapper.updateComment(dto, userCode, postId);
    }

    @Transactional
    public int deleteComment(CommentDTO dto, int userCode, int postId) {

        return commentMapper.deleteComment(dto, userCode, postId);
    }
}
