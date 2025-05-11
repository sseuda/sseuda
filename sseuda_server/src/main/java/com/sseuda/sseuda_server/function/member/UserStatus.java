package com.sseuda.sseuda_server.function.member;

public enum UserStatus {

    활성("활성"),
    탈퇴("탈퇴");

    private String status;

    UserStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    @Override
    public String toString() {
        return "UserStatus{" +
                "status='" + status + '\'' +
                '}';
    }
}
