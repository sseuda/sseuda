package com.sseuda.sseuda_server.function.comment.controller;

import com.sseuda.sseuda_server.common.ResponseDTO;
import com.sseuda.sseuda_server.function.comment.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.stream.events.Comment;

@RestController
@RequestMapping("/post/*")
public class CommentController {

    private static final Logger log = LoggerFactory.getLogger(CommentController.class);
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @Operation(summary = "게시물별 댓글 조회", description = "게시물별 댓글 조회가 진행됩니다.", tags = {"CommentController"})
    @GetMapping("/comment")
    public ResponseEntity<ResponseDTO> findPostComment(@RequestParam("postId") int postId){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "게시물별 댓글 조회 성공", commentService.findPostComment(postId)));
    }
}
