package com.sseuda.sseuda_server.function.member.service;

import com.sseuda.sseuda_server.function.member.dao.MemberMapper;
import com.sseuda.sseuda_server.function.member.UserStatus;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.sseuda.sseuda_server.function.member.dto.MemberDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;


    @Transactional
    public int signup(MemberDTO dto) {
        // 비밀번호 암호화
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        dto.setUserStatus(UserStatus.활성);

        // 회원 정보 저장
        int result = memberMapper.insertMember(dto);

        // 기본 롤 저장 (USER)
        Map<String, Object> param = new HashMap<>();
        param.put("userId", dto.getUserId());
        param.put("userRole", "USER");

        // role insert
        memberMapper.insertUserRole(param);

        return result;
    }

    public boolean isUsernameDuplicate(String username) {
        return memberMapper.findMemberByUsername(username) != null;
    }

    // 회원 전체 조회
    public List<MemberDTO> getAllMembers() {
        return memberMapper.findAllMembers();
    }

    // 특정 회원 조회 (username)
    public MemberDTO getMemberByUsername(String username) {
        return memberMapper.findMemberByUsername(username);
    }

    // 회원 정보 수정 (user id)
    public int updateUserInfo(MemberDTO member) {
        return memberMapper.updateUserInfo(member);
    }

    // 회원 탈퇴 (비활성화)
    public int deactivateUser(MemberDTO member) {
        return memberMapper.deactivateUser(member);
    }

    // 아이디 찾기 (이메일로)
    public String findUsernameByEmail(String email) {
        String username = memberMapper.findUsernameByEmail(email);
        System.out.println("입력한 이메일: " + email);
        if (username == null) {
            throw new IllegalArgumentException("서비스: 해당 이메일로 가입된 회원이 없습니다.");
        }
        return username;
    }

    public void sendUsernameEmail(String to, String username) {
        String subject = "[쓰다] 아이디 찾기 결과";
        String content = String.format("""
                <div style='padding:20px; font-family:sans-serif;'>
                    <h2>아이디 찾기 결과</h2>
                    <p>요청하신 이메일로 가입된 아이디는 다음과 같습니다:</p>
                    <p style='font-weight:bold; font-size:18px;'>%s</p>
                    <br>
                    <p>감사합니다.</p>
                </div>
                """, username);

        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true); // HTML 전송
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("이메일 전송 실패", e);
        }
    }
}
