package com.sseuda.sseuda_server.member.pojo;

import com.sseuda.sseuda_server.member.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class Member implements UserDetails {


public class Member {

    private final String username;
    private final String password;
    private UserRole role;

    public Member(String username, String password, UserRole role) {
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
