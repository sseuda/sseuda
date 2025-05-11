package com.sseuda.sseuda_server.function.member.controller;

import com.sseuda.sseuda_server.function.member.dto.MemberDTO;
import com.sseuda.sseuda_server.function.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    // 회원 정보 수정 (user id)
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUserInfo(@PathVariable int id, @RequestBody MemberDTO dto) {
        dto.setUserId(id);
        int result = memberService.updateUserInfo(dto);
        if (result > 0) {
            return ResponseEntity.ok("수정 완료!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("수정 실패ㅜㅜ");
        }
    }

    // 회원 탈퇴 (비활성화)
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<String> deactivateMember(@PathVariable int id, @RequestBody MemberDTO dto) {
        dto.setUserId(id);
        int result = memberService.deactivateUser(dto);
        if (result > 0) {
            return ResponseEntity.ok("탈퇴 완료");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("탈퇴안돼ㅜㅠ");
        }
    }
}