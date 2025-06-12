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
    @PostMapping("/comment/{username}")
    public ResponseEntity<String> insertComment(@ModelAttribute CommentDTO dto,
                                                     @RequestParam("postId") int postId,
                                                     @PathVariable("username") String username){

        int userCode = 0;
        if(username != null){
            userCode = memberService.getMemberByUsername(username).getUserId();
        }
        System.out.println("아이디는?? " + userCode);

        commentService.insertComment(dto, userCode, postId);
        System.out.println("받은 CommentDTO: " + dto);

        return ResponseEntity.ok("댓글 등록 성공");
    }
}
