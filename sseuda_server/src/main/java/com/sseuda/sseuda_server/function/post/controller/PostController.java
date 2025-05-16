package com.sseuda.sseuda_server.function.post.controller;

import com.sseuda.sseuda_server.common.ResponseDTO;
import com.sseuda.sseuda_server.function.post.dto.PostDTO;
import com.sseuda.sseuda_server.function.post.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @Operation(summary = "카테고리별 게시글 전체 조회", description = "카테고리별 게시글 전체 조회가 진행됩니다.", tags = {"PostController"})
    @GetMapping("/all/{bigCategoryId}/{smallCategoryId}")
    public ResponseEntity<ResponseDTO> findCategoryPostList(@PathVariable("bigCategoryId") int bigCategoryId,
                                                            @PathVariable("smallCategoryId") int smallCategoryId){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "카테고리별 게시글 전체 조회 성공", postService.findCategoryPostList(bigCategoryId, smallCategoryId)));
    }

    @Operation(summary = "회원별 게시글 전체 조회", description = "회원별로 게시글 전체 조회가 진행됩니다.", tags = {"PostController"})
    @GetMapping("/all/{userCode}")
    public ResponseEntity<ResponseDTO> findUserPostList(@PathVariable("userCode") int userCode){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "게시글 전체 조회 성공", postService.findUserPostList(userCode)));
    }

    @Operation(summary = "회원별 카테고리 게시글 전체 조회", description = "회원별 카테고리 게시글 전체 조회가 진행됩니다.", tags = {"PostController"})
    @GetMapping("/all/{userCode}/{bigCategoryId}/{smallCategoryId}")
    public ResponseEntity<ResponseDTO> findUserCategoryPostList(@PathVariable("userCode") int userCode,
                                                            @PathVariable("bigCategoryId") int bigCategoryId,
                                                            @PathVariable("smallCategoryId") int smallCategoryId){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "카테고리별 게시글 전체 조회 성공", postService.findUserCategoryPostList(userCode, bigCategoryId, smallCategoryId)));
    }

//    React에서 axios로 넘겨준다
    @Operation(summary = "회원별 게시글 등록", description = "회원별 카테고리 게시글 등록이 진행됩니다.", tags = {"PostController"})
    @PostMapping("/posts")
    public ResponseEntity<String> saveUserPosting(
//            @PathVariable("userCode") int userCode,
//                                                    @PathVariable("bigCategoryId") int bigCategoryId,
//                                                    @PathVariable("smallCategoryId") int smallCategoryId,
                                                    @RequestBody PostDTO dto){

        postService.saveUserPosting(
             dto.getPostTitle(),
            dto.getUserId(),
            dto.getPostContent(),
            dto.getSmallCategoryId()
        );

        return ResponseEntity.ok("게시글 저장 완료");

    }

    @Operation(summary = "회원별 게시글 삭제", description = "회원별 게시글 삭제가 진행됩니다.", tags = {"PostController"})
    @DeleteMapping("/mypage/{userCode}/{postId}/delete")
    public ResponseEntity<String> deleteUserPosting(@ModelAttribute PostDTO post,
                                                    @PathVariable("userCode") int userCode,
                                                    @PathVariable("postId") int postId){

        int result = postService.deleteUserPosting(post, userCode, postId);

        if(result > 0){
            return ResponseEntity.ok("해당 게시글이 삭제되었습니다.");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 게시글을 찾을 수 없습니다.");
        }
    }

}
