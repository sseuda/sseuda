package com.sseuda.sseuda_server.function.member.dto;

public class LoginDTO {

    private String username;
    private String password;

    private String userStatus;

    // 기본 생성자 필요 (JSON -> 객체 변환 시)
    public LoginDTO() {}

    public LoginDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(String userStatus) {
        this.userStatus = userStatus;
    }
}
