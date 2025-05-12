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
@RequestMapping("/post/*")
public class PostController {

    private static Logger log = LoggerFactory.getLogger(PostController.class);
    private PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @Operation(summary = "게시글 전체 조회", description = "게시글 전체 조회가 진행됩니다.", tags = {"PostController"})
    @GetMapping("/all")
    public ResponseEntity<ResponseDTO> findPostList(){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "게시글 전체 조회 성공", postService.findPostList()));
    }

//    yaml 파일 삭제..
}
