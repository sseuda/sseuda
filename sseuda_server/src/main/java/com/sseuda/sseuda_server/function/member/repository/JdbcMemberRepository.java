package com.sseuda.sseuda_server.function.member.repository;

import com.sseuda.sseuda_server.function.member.UserRole;
import com.sseuda.sseuda_server.function.member.UserStatus;
import com.sseuda.sseuda_server.function.member.pojo.Login;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class JdbcMemberRepository implements MemberRepository {

    private final JdbcTemplate jdbcTemplate;

    public JdbcMemberRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
        public Login findByUsername(String username) {
            String sql = "SELECT m.username, m.password, m.user_status, r.user_role " +
                        "FROM tbl_member m " +
                        "JOIN tbl_user_role r ON m.user_id = r.user_id " +
                        "WHERE m.username = ?";
            try{
                return jdbcTemplate.queryForObject(sql, new Object[]{username}, (rs, rowNum) -> {
                    String uname = rs.getString("username");
                    String pwd = rs.getString("password");
                    String statusStr = rs.getString("user_status");
                    UserStatus status = UserStatus.valueOf(statusStr);
                    String roleStr = rs.getString("user_role").toUpperCase();
                    UserRole role = UserRole.valueOf(roleStr);

                    System.out.println("statusStr: " + statusStr);
                    System.out.println("유저 상태: " + status);

                    return new Login(uname, pwd, role, status);
                });
            } catch (EmptyResultDataAccessException e) {
                return null;
            }
        }
}
