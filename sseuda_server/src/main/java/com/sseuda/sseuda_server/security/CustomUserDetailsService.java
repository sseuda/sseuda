package com.sseuda.sseuda_server.security;

import com.sseuda.sseuda_server.function.member.pojo.Login;
import com.sseuda.sseuda_server.function.member.repository.JdbcMemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final JdbcMemberRepository memberRepository;

    public CustomUserDetailsService(JdbcMemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Login login = memberRepository.findByUsername(username);
        if (login == null) {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username);
        }
        return new CustomUserDetails(login);
    }
}