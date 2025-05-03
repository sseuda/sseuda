package com.sseuda.sseuda_server.function.member.dao;

import com.sseuda.sseuda_server.function.member.dto.MemberDTO;

public interface MemberMapper {
    void insertMember(MemberDTO member);

    MemberDTO findMemberByUsername(String username);
}
