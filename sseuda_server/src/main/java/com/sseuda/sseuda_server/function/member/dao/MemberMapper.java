package com.sseuda.sseuda_server.function.member.dao;

import com.sseuda.sseuda_server.function.member.dto.MemberDTO;
import com.sseuda.sseuda_server.function.member.dto.PasswordTokenDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MemberMapper {
    int insertMember(MemberDTO member);

    int insertUserRole(Map<String, Object> param);

    List<MemberDTO> findAllMembers();

    MemberDTO findMemberByUsername(String username);

    MemberDTO findMemberByEmail(String email);

    int updateUserInfo(MemberDTO member);

    int deactivateUser(MemberDTO member);

    String findUsernameByEmail(String email);

    // 비밀번호 초기화
    void insertPasswordToken(PasswordTokenDTO passwordToken);
    PasswordTokenDTO findPasswordToken(String token);
    void deleteByEmail(String email);       // 재발급 시 이전꺼 삭제

    int updatePassword(MemberDTO member);

    int deleteByToken(String token);
}
