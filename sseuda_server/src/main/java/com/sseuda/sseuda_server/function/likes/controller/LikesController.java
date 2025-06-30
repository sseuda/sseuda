package com.sseuda.sseuda_server.function.likes.controller;

import com.sseuda.sseuda_server.common.ResponseDTO;
import com.sseuda.sseuda_server.function.likes.dto.LikesDTO;
import com.sseuda.sseuda_server.function.likes.service.LikesService;
import com.sseuda.sseuda_server.function.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/like/*")
public class LikesController {

    private static Logger log = LoggerFactory.getLogger(LikesController.class);
    private LikesService likesService;
    private MemberService memberService;

    @Autowired
    public LikesController(LikesService likesService, MemberService memberService) {
        this.likesService = likesService;
        this.memberService = memberService;
    }

//    알람시 사용
    @Operation(summary = "좋아요 리스트 전체 조회", description = "좋아요 리스트 전체 조회가 진행됩니다.", tags = {"LikesController"})
    @GetMapping("/allList")
    public ResponseEntity<ResponseDTO> findLikesList(@RequestParam("postId") int postId){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "좋아요 리스트 전체 조회 성공", likesService.findLikesList(postId)));
    }

//    게시글에 대한 조회수만
    @Operation(summary = "좋아요 전체 조회", description = "좋아요 전체 조회가 진행됩니다.", tags = {"LikesController"})
    @GetMapping("/all")
    public ResponseEntity<ResponseDTO> findLikes(@RequestParam("postId") int postId){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "좋아요 전체 조회 성공", likesService.findLikes(postId)));
    }

//    회원별 좋아요한 게시글 조회
//    @Operation(summary = "회원별 좋아요한 게시글 조회", description ="회원별 좋아요한 게시글의 조회가 진행됩니다.", tags = {"LikesController"})
//    @GetMapping("/{username}/List")
//    public ResponseEntity<ResponseDTO> userLikesList(@PathVariable("username") String username,
//                                                     @RequestParam("postId") int postId){
//
//        int userCode = 0;
//        if(username != null){
//            userCode = memberService.getMemberByUsername(username).getUserId();
//        }
//
//        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "회원별 좋아요 전체 리스트 조회 성공", likesService.userLikesList(userCode, postId)));
//    }

//    배너 조회
    @Operation(summary = "배너 조회", description = "배너 조회가 진행됩니다.", tags = {"PostController"})
    @GetMapping("/banner")
    public ResponseEntity<ResponseDTO> findBannerLikeList(){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "배너 조회 성공", likesService.findBannerLikeList()));
    }

//    좋아요 등록
    @Operation(summary = "회원별 게시글 좋아요 등록", description = "회원별 게시글 좋아요 등록이 진행됩니다.", tags = {"LikesController"})
    @PostMapping("/insert/{username}")
    public ResponseEntity<ResponseDTO> insertLike(@PathVariable("username") String username,
                                                  @RequestParam("postId") int postId,
                                                  @ModelAttribute LikesDTO dto){

        int userCode = 0;
        if(username != null){
            userCode = memberService.getMemberByUsername(username).getUserId();
        }

        int result = likesService.insertLike(postId, userCode, dto);

        if(result > 0){
            return ResponseEntity.ok(new ResponseDTO(HttpStatus.OK, "좋아요가 추가되었습니다.", result));
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseDTO(HttpStatus.NOT_FOUND, "해당 게시글을 찾을 수 없습니다.", null));
        }
    }

//    좋아요 삭제
    @Operation(summary = "회원별 게시글 좋아요 삭제", description = "회원별 게시글 좋아요 삭제 진행중", tags = {"LikesController"})
    @DeleteMapping("/delete/{username}")
    public ResponseEntity<ResponseDTO> deleteLike(@PathVariable("username") String username,
                                                  @RequestParam("postId") int postId){

        int userCode = 0;
        if(username != null){
            userCode = memberService.getMemberByUsername(username).getUserId();
        }

        int result = likesService.deleteLike(postId, userCode);

        if(result > 0){
            return ResponseEntity.ok(new ResponseDTO(HttpStatus.OK, "좋아요가 삭제되었습니다.", result));
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseDTO(HttpStatus.NOT_FOUND, "해당 게시글을 찾을 수 없습니다.", null));
        }
    }


}
