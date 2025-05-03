package com.sseuda.sseuda_server.function.member.controller;

import com.sseuda.sseuda_server.function.member.dto.MemberDTO;
import com.sseuda.sseuda_server.function.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    // 회원가입 처리
    @PostMapping("/register")
    public String registerMember(@RequestBody MemberDTO dto) {
        int result = memberService.register(dto);
        return result > 0 ? "회원가입 성공" : "회원가입 실패";
    }
}