package com.sseuda.sseuda_server.function.member.service;

import com.sseuda.sseuda_server.function.member.dao.MemberMapper;
import com.sseuda.sseuda_server.function.member.UserStatus;
import com.sseuda.sseuda_server.function.member.dto.PasswordTokenDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.sseuda.sseuda_server.function.member.dto.MemberDTO;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;
    private final MailService mailService;

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

        System.out.println("username????? " + username);

        return memberMapper.findMemberByUsername(username);
    }

    // 특정 회원 조회 (email)
    public MemberDTO findMemberByEmail(String email) {
        return memberMapper.findMemberByEmail(email);
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

    // 아이디 찾기 (풀네임, 이메일)
    public String findUsernameByFullnameAndEmail(String fullname, String email) {
        String username = memberMapper.findUsernameByFullnameAndEmail(fullname, email);
        System.out.println("입력한 풀네임: " + fullname + " / 입력한 이메일: " + email);

        if (username == null) {
            throw new IllegalArgumentException("서비스: 일치하는 사용자를 찾을 수 없습니다.");
        }

        return username;
    }

    public void sendUsernameEmail(String fullname, String to, String username) {
        String subject = "[쓰다] 아이디 찾기 결과";
        String content = String.format("""
            <div style='padding:20px; font-family:sans-serif;'>
                <h2>아이디 찾기 결과</h2>
                <p><strong>%s</strong> 님, 요청하신 이메일로 가입된 아이디는 다음과 같습니다:</p>
                <p style='font-weight:bold; font-size:18px;'>%s</p>
                <br>
                <p>감사합니다.</p>
            </div>
            """, fullname, username);

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

    public PasswordTokenDTO findPasswordToken(String token) {
        return memberMapper.findPasswordToken(token);
    }

    public void updatePassword(MemberDTO member, String newPassword) {
        String encodedPassword = passwordEncoder.encode(newPassword);
        member.setPassword(encodedPassword);
        memberMapper.updatePassword(member);
    }

    public void deleteByToken(String token) {
        memberMapper.deleteByToken(token);
    }

    // 비밀번호 찾기(재설정) 프로세스
    public void processPasswordReset(String email) {

//        System.out.println("서비스에서 비밀번호찾기 프로세스 시작");
        // 1. 사용자 존재 여부 확인
        MemberDTO member = memberMapper.findMemberByEmail(email);
        if (member == null) {
            throw new IllegalArgumentException("해당 이메일로 등록된 사용자가 없습니다.");
        }

//        System.out.println("서비스에서 토큰 생성 시작");
        // 2. 토큰 생성
        String token = UUID.randomUUID().toString();
        LocalDateTime expiration = LocalDateTime.now().plusMinutes(30);
//        System.out.println("token: " + token);

//        System.out.println("서비스에서 디비 저장 시작");
        // 3. DB에 토큰 저장
        PasswordTokenDTO tokenDTO = new PasswordTokenDTO();
        tokenDTO.setEmail(email);
        tokenDTO.setToken(token);
        tokenDTO.setExpiration(expiration);
        tokenDTO.setCreatedAt(LocalDateTime.now());

        memberMapper.insertPasswordToken(tokenDTO);
//        System.out.println("저장된 내용: " + tokenDTO);

        // 4. 이메일 전송
        mailService.sendPasswordEmail(email, token);
    }

}
