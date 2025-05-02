package com.sseuda.sseuda_server.member.service;

import com.sseuda.sseuda_server.jwt.TokenDTO;
import com.sseuda.sseuda_server.jwt.TokenProvider;
import com.sseuda.sseuda_server.member.dto.LoginDTO;
import com.sseuda.sseuda_server.member.pojo.Member;
import com.sseuda.sseuda_server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public TokenDTO login(LoginDTO loginDTO) {
        Member member = memberRepository.findByUsername(loginDTO.getUsername());

        System.out.println("로그인 시작");
        System.out.println("누가로그인해? " + loginDTO.getUsername());

        // 여기에서 matches로 비밀번호 비교!
        if (member == null) {
            System.out.println("존재하지 않는 사용자: " + loginDTO.getUsername());
            throw new BadCredentialsException("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        if (!passwordEncoder.matches(loginDTO.getPassword(), member.getPassword())) {
            System.out.println("비밀번호 불일치: " + loginDTO.getUsername());
            throw new BadCredentialsException("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        String token = tokenProvider.createToken(member);
        long now = System.currentTimeMillis();
        long expireTime = now + 1000 * 60 * 60; // 1시간

        System.out.println("로그인 완료");
        // 로그인 성공 시 토큰 발급
        return new TokenDTO("Bearer", member.getUsername(), token, expireTime);
    }

}