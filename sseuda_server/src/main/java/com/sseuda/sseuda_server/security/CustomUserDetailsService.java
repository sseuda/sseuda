package com.sseuda.sseuda_server.security;

import com.sseuda.sseuda_server.member.pojo.Member;
import com.sseuda.sseuda_server.member.repository.JdbcMemberRepository;
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
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username);
        }
        return new CustomUserDetails(member);
    }
}