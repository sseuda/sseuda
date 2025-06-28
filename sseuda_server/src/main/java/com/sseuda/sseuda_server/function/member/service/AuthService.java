package com.sseuda.sseuda_server.function.member.service;

import com.sseuda.sseuda_server.jwt.TokenDTO;
import com.sseuda.sseuda_server.jwt.TokenProvider;
import com.sseuda.sseuda_server.function.member.dto.LoginDTO;
import com.sseuda.sseuda_server.function.member.pojo.Login;
import com.sseuda.sseuda_server.function.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RedisTemplate<String, String> redisTemplate;

    public TokenDTO login(LoginDTO loginDTO) {
        Login login = memberRepository.findByUsername(loginDTO.getUsername());

        System.out.println("로그인 시작");
        System.out.println("누가로그인해? " + loginDTO.getUsername());

        // 여기에서 matches로 비밀번호 비교!
        if (login == null) {
            System.out.println("존재하지 않는 사용자: " + loginDTO.getUsername());
            throw new BadCredentialsException("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        if (!"활성".equals(login.getUserStatus().getStatus())) {
            System.out.println("로그인 불가 계정:  " + loginDTO.getUsername());
            throw new BadCredentialsException("비활성화된 계정");
        }

        if (!passwordEncoder.matches(loginDTO.getPassword(), login.getPassword())) {
            System.out.println("비밀번호 불일치: " + loginDTO.getUsername());
            throw new BadCredentialsException("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        String token = tokenProvider.createToken(login);
        long now = System.currentTimeMillis();
        long expireTime = now + 1000 * 60 * 60; // 1시간

        System.out.println("로그인 완료");
        System.out.println("토큰: " + token);
        // 로그인 성공 시 토큰 발급
        return new TokenDTO("Bearer", login.getUsername(), token, expireTime);
    }

    public void blacklistToken(String token) {
        System.out.println("로그아웃 시도");
        long expiration = tokenProvider.getTokenRemainingTime(token);
        redisTemplate.opsForValue().set(token, "logout", expiration, TimeUnit.MILLISECONDS);
    }

    public boolean isBlacklisted(String token) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(token));
    }

}