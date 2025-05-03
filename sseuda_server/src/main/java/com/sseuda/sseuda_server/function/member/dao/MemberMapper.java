package com.sseuda.sseuda_server.function.member.dao;

import com.sseuda.sseuda_server.function.member.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    int insertMember(MemberDTO member);

    MemberDTO findMemberByUsername(String username);
}
