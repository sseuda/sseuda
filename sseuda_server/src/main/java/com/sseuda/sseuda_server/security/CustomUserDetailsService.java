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

        System.out.println("유저 찾기 시도: " + username);

        // MemberRepository에서 Member 객체를 가져와서 CustomUserDetails로 변환
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new UsernameNotFoundException("존재하지 않는 사용자입니다: " + username);
        }

        System.out.println(username + "찾기완료!");

        return new CustomUserDetails(member);
    }
}