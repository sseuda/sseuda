package com.sseuda.sseuda_server.function.member.dto;

import com.sseuda.sseuda_server.function.member.UserRole;

public class UserRoleDTO {

    private int userId;
    private UserRole userRole;

    public UserRoleDTO() {
    }

    public UserRoleDTO(int userId, UserRole userRole) {
        this.userId = userId;
        this.userRole = userRole;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    @Override
    public String toString() {
        return "UserRoleDTO{" +
                "userId=" + userId +
                ", userRole=" + userRole +
                '}';
    }
}
