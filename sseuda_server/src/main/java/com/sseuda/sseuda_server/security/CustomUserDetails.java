package com.sseuda.sseuda_server.security;

import com.sseuda.sseuda_server.member.pojo.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final Member member;

    public CustomUserDetails(Member member) {
        this.member = member;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(member.getRole().name()));
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

    @Override
    public String getUsername() {
        return member.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // 필요 시 변경
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // 필요 시 변경
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 필요 시 변경
    }

    @Override
    public boolean isEnabled() {
        return true; // 필요 시 변경
    }
}
