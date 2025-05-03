package com.sseuda.sseuda_server.function.member.service;

import com.sseuda.sseuda_server.function.member.dao.MemberMapper;
import com.sseuda.sseuda_server.function.member.UserStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.sseuda.sseuda_server.function.member.dto.MemberDTO;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;

    public int register(MemberDTO dto) {
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        dto.setUserStatus(UserStatus.활성);
        return memberMapper.insertMember(dto);
    }

    public boolean isUsernameDuplicate(String username) {
        return memberMapper.findMemberByUsername(username) != null;
    }
}
