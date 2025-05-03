package com.sseuda.sseuda_server.member.pojo;

public class Member {

    private final String username;
    private final String password;
//    private final enum userRole;

    public Member(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // getter만 제공 (불변성 보장)
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
