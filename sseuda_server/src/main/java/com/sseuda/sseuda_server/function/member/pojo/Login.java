package com.sseuda.sseuda_server.function.member.pojo;

import com.sseuda.sseuda_server.function.member.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class Login implements UserDetails {

    private final String username;
    private final String password;
    private UserRole role;

    public Login(String username, String password, UserRole role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // getter만 제공 (불변성 보장)
    public String getUsername() {
        return username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public String getPassword() {
        return password;
    }

    public UserRole getRole() {
        return role;
    }

    // 관리자가 role 변경이 가능하도록 (user->admin)
    public void setRole(UserRole role) {
        this.role = role;
    }

}
