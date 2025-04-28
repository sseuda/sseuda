package com.sseuda.sseuda_server.function.post.controller;

import com.sseuda.sseuda_server.common.ResponseDTO;
import com.sseuda.sseuda_server.function.post.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/*")
public class PostController {

    private static final Logger log = LoggerFactory.getLogger(PostController.class);
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @Operation(summary = "포스팅 전체 조회", description = "포스팅 전체 조회", tags = {"PostController"})
    @GetMapping("/mypage")
    public ResponseEntity<ResponseDTO> findPostList(){

        return ResponseEntity.ok(new ResponseDTO(HttpStatus.OK, "조회 성공", postService.findPostList()));
    }
}
