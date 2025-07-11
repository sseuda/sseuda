package com.sseuda.sseuda_server.function.member.controller;

import com.sseuda.sseuda_server.common.ResponseDTO;
import com.sseuda.sseuda_server.function.member.dao.MemberMapper;
import com.sseuda.sseuda_server.function.member.dto.MailRequestDTO;
import com.sseuda.sseuda_server.function.member.dto.MemberDTO;
import com.sseuda.sseuda_server.function.member.dto.PasswordTokenDTO;
import com.sseuda.sseuda_server.function.member.dto.UserRoleDTO;
import com.sseuda.sseuda_server.function.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Member;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;

    @Autowired
    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
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

    // 특정 회원 조회 (userId)
    @GetMapping("/user/{userId}")
    public MemberDTO findMemberByUserId(@PathVariable int userId) {
        return memberService.findMemberByUserId(userId);
    }

    // 특정 회원 조회 (username)
    @GetMapping("/{username}")
    public MemberDTO getMemberByUsername(@PathVariable("username") String username) {
        return memberService.getMemberByUsername(username);
    }

    // 회원 정보 수정 (user id)
    @PutMapping("/{id}/update")
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
    @PutMapping("/{id}/status")
    public ResponseEntity<String> deactivateMember(@PathVariable int id, @RequestBody MemberDTO dto) {
        dto.setUserId(id);
        int result = memberService.deactivateUser(dto);
        if (result > 0) {
            return ResponseEntity.ok("상태변경 완료");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("상태변경 불가");
        }
    }

    // 아이디 찾기 (이메일로)
    @PostMapping("/find-username")
    public ResponseEntity<?> findUsernameAndSendMail(@RequestBody MailRequestDTO request) {
        System.out.println(">>> 아이디 찾기 요청: 이름=" + request.getFullname() + ", 이메일=" + request.getTo());

        try {
            String email = request.getTo();
            String fullname = request.getFullname();

            String username = memberService.findUsernameByFullnameAndEmail(fullname, email);

            memberService.sendUsernameEmail(fullname, email, username);

            return ResponseEntity.ok("아이디가 이메일로 전송되었습니다.");

        } catch (IllegalArgumentException e) {
            // 사용자가 잘못 입력한 경우 → 400 에러로 처리
            return ResponseEntity.badRequest().body(e.getMessage());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("아이디 전송 중 서버 오류 발생: " + e.getMessage());
        }
    }

    // 비밀번호 찾기 (초기화)
    @GetMapping("/reset-password")
    public String showResetPasswordForm(@RequestParam("token") String token, Model model) {
        PasswordTokenDTO passwordToken = memberMapper.findPasswordToken(token);

        if (passwordToken == null || passwordToken.getExpiration().isBefore(LocalDateTime.now())) {
            model.addAttribute("error", "유효하지 않거나 만료된 링크입니다!");
            return "reset-password-error";  // 에러 페이지
        }

        model.addAttribute("token", token);
        return "reset-password-form";   // 비밀번호 재설정 폼 페이지
    }

    // 1. 비밀번호 요청
    @PostMapping("/reset-password-request")
    public ResponseEntity<?> requestPasswordReset(@RequestParam("email") String email,
                                       @RequestParam("username") String username) {

        System.out.println(">>>> 입력한 이메일: " + email);
        System.out.println(">>>> 입력한 아이디: " + username);

        MemberDTO member = memberService.findMemberByEmail(email);

        // 이메일로 가입된 사용자가 없을 경우
        if (member == null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("해당 이메일로 등록된 사용자가 없습니다.");
        }

        // 아이디가 일치하지 않을 경우
        if (!member.getUsername().equals(username)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("아이디와 이메일이 일치하지 않습니다.");
        }

        // 둘 다 일치하면 토큰 생성 및 이메일 전송
        try {
            memberService.processPasswordReset(email);
            return ResponseEntity.ok("비밀번호 재설정 링크를 이메일로 전송했습니다.");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("메일 전송 중 오류가 발생했습니다.");
        }
    }

    // 2. 비밀번호 재설정
    @PostMapping("/reset-password")
    public String handlePasswordReset(@RequestParam("token") String token, @RequestParam("password") String newPassword, Model model) {
        System.out.println("찐 재설정 시작");
        PasswordTokenDTO passwordToken = memberService.findPasswordToken(token);
        if (passwordToken == null || passwordToken.getExpiration().isBefore(LocalDateTime.now())) {
            model.addAttribute("message", "유효하지 않거나 만료된 링크임");
            return "reset-password-error";
        }

        MemberDTO member = memberService.findMemberByEmail(passwordToken.getEmail());
        if (member == null) {
            model.addAttribute("message", "사용자를 찾을 수 없음");
            return "reset-password-error";
        }

        memberService.updatePassword(member, newPassword);

        memberService.deleteByToken(token);

        return "redirect:/login?resetSuccess";  // 로그인 페이지로 이동
    }

    // user_role 변경
    @PutMapping("/role")
    public ResponseEntity<?> updateUserRole(@RequestBody UserRoleDTO userRole) {
        boolean result = memberService.updateUserRole(userRole);
        if (result) {
            return ResponseEntity.ok("권한이 변경되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("변경 실패: 해당 유저를 찾을 수 없습니다.");
        }
    }


    // 회원 검색
    @GetMapping("/search")
    public ResponseEntity<ResponseDTO> searchMember(@RequestParam("keyword") String keyword) {
        List<MemberDTO> members = memberService.searchMember(keyword);
        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "회원 검색 성공", members));
    }
}