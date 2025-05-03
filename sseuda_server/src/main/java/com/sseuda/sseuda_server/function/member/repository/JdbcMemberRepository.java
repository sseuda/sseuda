package com.sseuda.sseuda_server.member.repository;

import com.sseuda.sseuda_server.member.UserRole;
import com.sseuda.sseuda_server.member.pojo.Login;
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
            String sql = "SELECT m.username, m.password, r.user_role " +
                        "FROM tbl_member m " +
                        "JOIN tbl_user_role r ON m.user_id = r.user_id " +
                        "WHERE m.username = ?";
            try{
                return jdbcTemplate.queryForObject(sql, new Object[]{username}, (rs, rowNum) -> {
                    String uname = rs.getString("username");
                    String pwd = rs.getString("password");
                    String roleStr = rs.getString("user_role").toUpperCase();
                    UserRole role = UserRole.valueOf(roleStr);

                    return new Login(uname, pwd, role);
                });
            } catch (EmptyResultDataAccessException e) {
                return null;
            }
        }
}
