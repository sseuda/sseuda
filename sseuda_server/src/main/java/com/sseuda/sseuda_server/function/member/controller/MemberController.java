package com.sseuda.sseuda_server.function.member.controller;

import com.sseuda.sseuda_server.function.member.dto.MemberDTO;
import com.sseuda.sseuda_server.function.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    // 회원가입 처리
    @PostMapping("/signup")
    public String registerMember(@RequestBody MemberDTO dto) {
        int result = memberService.signup(dto);
        return result > 0 ? "회원가입 성공" : "회원가입 실패";
    }

    // 전체 회원 조회
    @GetMapping("/all")
    public List<MemberDTO> getAllMembers() {
        return memberService.getAllMembers();
    }

    // 특정 회원 조회 (username)
    @GetMapping("/{username}")
    public MemberDTO getMemberByUsername(@PathVariable("username") String username) {
        return memberService.getMemberByUsername(username);
    }

}