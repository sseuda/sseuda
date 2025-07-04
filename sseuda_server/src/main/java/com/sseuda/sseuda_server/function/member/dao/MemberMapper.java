package com.sseuda.sseuda_server.function.member.dao;

import com.sseuda.sseuda_server.function.member.dto.MemberDTO;
import com.sseuda.sseuda_server.function.member.dto.PasswordTokenDTO;
import com.sseuda.sseuda_server.function.member.dto.UserRoleDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MemberMapper {
    int insertMember(MemberDTO member);

    int insertUserRole(Map<String, Object> param);

    List<MemberDTO> findAllMembers();

    // 회원 조회( userId )
    MemberDTO findMemberByUserId(int userId);

    MemberDTO findMemberByUsername(String username);

    MemberDTO findMemberByEmail(String email);

    int updateUserInfo(MemberDTO member);

    int deactivateUser(MemberDTO member);

    String findUsernameByEmail(String email);

    String findUsernameByFullnameAndEmail(String fullname, String email);

    // 비밀번호 초기화
    void insertPasswordToken(PasswordTokenDTO passwordToken);
    PasswordTokenDTO findPasswordToken(String token);
    void deleteByEmail(String email);       // 재발급 시 이전꺼 삭제

    int updatePassword(MemberDTO member);

    int deleteByToken(String token);

//    post에서 필요한 username 가져오기
    String findUsernameByUserId(int userId);

    // user_role 변경
    int updateUserRole(UserRoleDTO userRoleDTO);

    // 회원 검색
    List<MemberDTO> searchMember(String keyword);

}
