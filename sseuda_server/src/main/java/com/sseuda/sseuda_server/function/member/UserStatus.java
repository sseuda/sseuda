package com.sseuda.sseuda_server.function.member;

public enum UserStatus {

    활성("활성"),
    탈퇴("탈퇴"),
    비활성("비활성");

    private String status;

    UserStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

}
