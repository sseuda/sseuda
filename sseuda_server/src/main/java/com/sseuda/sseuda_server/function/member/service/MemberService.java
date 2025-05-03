package com.sseuda.sseuda_server.function.member.service;

import com.sseuda.sseuda_server.function.member.dao.MemberMapper;
import com.sseuda.sseuda_server.function.member.UserStatus;
import lombok.RequiredArgsConstructor;
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
}
