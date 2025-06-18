package com.sseuda.sseuda_server.function.post.controller;

import com.sseuda.sseuda_server.common.ResponseDTO;
import com.sseuda.sseuda_server.function.member.dto.MemberDTO;
import com.sseuda.sseuda_server.function.member.service.MemberService;
import com.sseuda.sseuda_server.function.post.dto.PostDTO;
import com.sseuda.sseuda_server.function.post.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.*;
import java.util.Map;

@RestController
@RequestMapping("/post/*")
public class PostController {

    private static Logger log = LoggerFactory.getLogger(PostController.class);
    private PostService postService;
    private MemberService memberService;

    @Autowired
    public PostController(PostService postService, MemberService memberService) {
        this.postService = postService;
        this.memberService = memberService;
    }

    @Operation(summary = "게시글 전체 조회", description = "게시글 전체 조회가 진행됩니다.", tags = {"PostController"})
    @GetMapping("/all")
    public ResponseEntity<ResponseDTO> findPostList(){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "게시글 전체 조회 성공", postService.findPostList()));
    }

    @Operation(summary = "게시글 상세 조회", description = "게시글 상세 조회가 진행됩니다.", tags = {"PostController"})
    @GetMapping("/{postId}")
    public ResponseEntity<ResponseDTO> findPost(@PathVariable("postId") int postId){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "게시글 상세 조회 성공", postService.findPost(postId)));
    }

    @Operation(summary = "카테고리별 게시글 전체 조회", description = "카테고리별 게시글 전체 조회가 진행됩니다.", tags = {"PostController"})
    @GetMapping("/all/{bigCategoryId}/{smallCategoryId}")
    public ResponseEntity<ResponseDTO> findCategoryPostList(@PathVariable("bigCategoryId") int bigCategoryId,
                                                             @PathVariable("smallCategoryId") int smallCategoryId){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "카테고리별 게시글 전체 조회 성공", postService.findCategoryPostList(bigCategoryId, smallCategoryId)));
    }

    @Operation(summary = "회원별 게시글 전체 조회", description = "회원별로 게시글 전체 조회가 진행됩니다.", tags = {"PostController"})
    @GetMapping("/mypage/{username}")
    public ResponseEntity<ResponseDTO> findUserPostList(@PathVariable("username") String username){

        int userCode = 0;
        if(username != null){
            userCode = memberService.getMemberByUsername(username).getUserId();
        }

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "게시글 전체 조회 성공", postService.findUserPostList(userCode)));
    }

    @Operation(summary = "회원별 카테고리 게시글 전체 조회", description = "회원별 카테고리 게시글 전체 조회가 진행됩니다.", tags = {"PostController"})
    @GetMapping("/mypage/{username}/{smallCategoryId}")
    public ResponseEntity<ResponseDTO> findUserCategoryPostList(@PathVariable("username") String username,
//                                                            @PathVariable("bigCategoryId") int bigCategoryId,
                                                            @PathVariable("smallCategoryId") int smallCategoryId){

        int userCode = 0;
        if(username != null){
            userCode = memberService.getMemberByUsername(username).getUserId();
        }

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "카테고리별 게시글 전체 조회 성공", postService.findUserCategoryPostList(userCode, smallCategoryId)));
    }


    // 검색용
    @Operation(summary = "검색", description = "검색 키워드에 따라 게시글 조회가 진행됩니다.", tags = {"PostController"})
    @GetMapping("/search")
    public ResponseEntity<ResponseDTO> searchPosts(@RequestParam("keyword") String keyword) {
        System.out.println("뭐 검색함? " + keyword);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "키워드 검색 성공", postService.searchPosts(keyword)));
    }


//    React에서 axios로 넘겨준다
    @Operation(summary = "회원별 게시글 등록", description = "회원별 카테고리 게시글 등록이 진행됩니다.", tags = {"PostController"})
    @PostMapping("/{username}/posting")
    public ResponseEntity<ResponseDTO> saveUserPosting(@ModelAttribute PostDTO dto,
                                                  @PathVariable("username") String username){

        int userCode = 0;
        if(username != null){
            userCode = memberService.getMemberByUsername(username).getUserId();
        }

        System.out.println("너의 아이디는? " + userCode);

        int result = postService.saveUserPosting(dto, userCode);

        if(result > 0){
            return ResponseEntity.ok(new ResponseDTO(HttpStatus.OK, "게시글 등록 성공", null));
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류로 인한 게시글 등록 실패",null));
        }
    }

    @Operation(summary = "회원별 게시글 수정", description = "회원별 카테고리 게시글 수정이 진행됩니다.", tags = {"PostController"})
    @PutMapping("/{username}/update")
    public ResponseEntity<ResponseDTO> updateUserPosting(@ModelAttribute PostDTO dto,
                                                       @PathVariable("username") String username,
                                                         @RequestParam("postId") int postId){

        int userCode = memberService.getMemberByUsername(username).getUserId();
        dto.setPostId(postId);
        dto.setUserId(userCode); // 권한 확인을 위해

        System.out.println("너의 아이디는? " + userCode);

        int result = postService.updateUserPosting(dto);

        System.out.println("dto!!!!!!!!!!!!!!!! " + dto);
        System.out.println("result!!!!!!!!!! " + result);


        if(result > 0){
            return ResponseEntity.ok(new ResponseDTO(HttpStatus.OK, "게시글 등록 성공", null));
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류로 인한 게시글 등록 실패",null));
        }
    }



    @Operation(summary = "회원별 게시글 삭제", description = "회원별 게시글 삭제가 진행됩니다.", tags = {"PostController"})
    @DeleteMapping("/mypage/{username}/delete")
    public ResponseEntity<ResponseDTO> deleteUserPosting(
                                                         @PathVariable("username") String username,
                                                         @RequestParam("postId") int postId){

        int userCode = 0;
        if(username != null){
            userCode = memberService.getMemberByUsername(username).getUserId();
        }

        System.out.println("너의 아이디는? " + userCode);

        int result = postService.deleteUserPosting(postId, userCode);
//        System.out.println("받은 CommentDTO: " + dto);

        if(result > 0){
            return ResponseEntity.ok(new ResponseDTO(HttpStatus.OK, "해당 게시글이 삭제되었습니다.", null));
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseDTO(HttpStatus.NOT_FOUND, "해당 게시글을 찾을 수 없습니다.", null));
        }
    }

//    게시글별 조회수 증가
    @Operation(summary = "게시글별 조회수가 증가됩니다.", description = "게시글별 조회수 증가가 진행됩니다.", tags = {"PostController"})
    @PutMapping("/viewCount/update")
    public ResponseEntity<ResponseDTO> viewCountUpdate(@RequestParam("postId") int postId){

        int result = postService.viewCountUpdate(postId);

        if(result > 0){
            return ResponseEntity.ok(new ResponseDTO(HttpStatus.OK, "조회수 증가 성공", null));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "해당 게시글을 찾을 수 없습니다.", null));
        }
    }

    // 마이페이지 특정 회원 조회 (username)
    @GetMapping("/member/{username}")
    public MemberDTO getMemberByUsername(@PathVariable("username") String username) {
        return memberService.getMemberByUsername(username);
    }

}
