package com.sseuda.sseuda_server.function.member.dao;

import com.sseuda.sseuda_server.function.member.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MemberMapper {
    int insertMember(MemberDTO member);

    int insertUserRole(Map<String, Object> param);

    List<MemberDTO> findAllMembers();

    MemberDTO findMemberByUsername(String username);
}
