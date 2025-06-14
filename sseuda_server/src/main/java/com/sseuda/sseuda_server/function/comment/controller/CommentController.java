package com.sseuda.sseuda_server.function.comment.controller;

import com.sseuda.sseuda_server.common.ResponseDTO;
import com.sseuda.sseuda_server.function.comment.dto.CommentDTO;
import com.sseuda.sseuda_server.function.comment.service.CommentService;
import com.sseuda.sseuda_server.function.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/post/*")
public class CommentController {

    private static final Logger log = LoggerFactory.getLogger(CommentController.class);
    private final CommentService commentService;
    private final MemberService memberService;

    @Autowired
    public CommentController(CommentService commentService, MemberService memberService) {
        this.commentService = commentService;
        this.memberService = memberService;
    }

    @Operation(summary = "게시물별 댓글 조회", description = "게시물별 댓글 조회가 진행됩니다.", tags = { "CommentController" })
    @GetMapping("/comment")
    public ResponseEntity<ResponseDTO> findPostComment(@RequestParam("postId") int postId) {
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "게시물별 댓글 조회 성공", commentService.findPostComment(postId)));
    }

    @Operation(summary = "게시물별 특정 회원 댓글 등록", description = "게시물별 특정 회원 댓글 등록이 진행됩니다.", tags = { "CommentController" })
    @PostMapping("/comment/{username}/input")
    public ResponseEntity<ResponseDTO> insertComment(@ModelAttribute CommentDTO dto,
                                                     @RequestParam("postId") int postId,
                                                     @PathVariable("username") String username){

        int userCode = 0;
        if(username != null){
            userCode = memberService.getMemberByUsername(username).getUserId();
        }
        System.out.println("아이디는?? " + userCode);


        // 댓글 등록 후 결과 받기 (예: 등록된 댓글 객체, 등록 성공 여부 등)
        int result = commentService.insertComment(dto, userCode, postId);

        if(result > 0){
            return ResponseEntity.ok(new ResponseDTO(HttpStatus.OK, "댓글 등록 성공", null));
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류로 인한 댓글 등록 실패", null));
        }

    }

    @Operation(summary = "게시물별 특정 회원 댓글 수정", description = "게시물별 특정 회원의 댓글 수정이 진행됩니다.", tags = { "CommentController" })
    @PutMapping("/comment/{username}/update")
    public ResponseEntity<ResponseDTO> updateComment(@ModelAttribute CommentDTO dto,
                                                @RequestParam("postId") int postId,
                                                @PathVariable("username") String username){

        int userCode = 0;
        if(username != null){
            userCode = memberService.getMemberByUsername(username).getUserId();
        }
        System.out.println("아이디는?? " + userCode);

        int result = commentService.updateComment(dto, userCode, postId);
        System.out.println("받은 CommentDTO: " + dto);

        if(result > 0) {
            return ResponseEntity.ok(new ResponseDTO(HttpStatus.OK, "댓글 수정 성공", null));
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류로 인한 댓글 수정 실패", null));
        }
    }

    @Operation(summary = "게시물별 특정 회원 댓글 삭제", description = "게시물별 특정 회원 댓글 삭제 진행중", tags = { "CommentController" })
    @DeleteMapping("/comment/{username}/delete")
    public ResponseEntity<ResponseDTO> deleteComment(@ModelAttribute CommentDTO dto,
                                                @RequestParam("postId") int postId,
                                                @PathVariable("username") String username){
        int userCode = 0;
        if(username != null){
            userCode = memberService.getMemberByUsername(username).getUserId();
        }
        System.out.println("아이디는?? " + userCode);

        int result = commentService.deleteComment(dto, userCode, postId);
        System.out.println("받은 CommentDTO: " + dto);

        if(result > 0){
            return ResponseEntity.ok(new ResponseDTO(HttpStatus.OK, "댓글 삭제 성공", null));
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류로 인한 댓글 삭제 실패", null));
        }
    }

}


