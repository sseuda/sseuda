package com.sseuda.sseuda_server.function.member.dto;

import com.sseuda.sseuda_server.function.member.UserRole;
import com.sseuda.sseuda_server.function.member.UserStatus;

import java.sql.Timestamp;

public class MemberDTO {

    private int userId;
    private String userFullname;
    private String username;
    private String password;
    private String userNickname;
    private String userEmail;
    private String userPhone;
    private Timestamp enrollDate;
    private UserStatus userStatus;
    private UserRole userRole;

    public MemberDTO() {
    }

    public MemberDTO(int userId, String userFullname, String username, String password, String userNickname, String userEmail, String userPhone, Timestamp enrollDate, UserStatus userStatus, UserRole userRole) {
        this.userId = userId;
        this.userFullname = userFullname;
        this.username = username;
        this.password = password;
        this.userNickname = userNickname;
        this.userEmail = userEmail;
        this.userPhone = userPhone;
        this.enrollDate = enrollDate;
        this.userStatus = userStatus;
        this.userRole = userRole;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserFullname() {
        return userFullname;
    }

    public void setUserFullname(String userFullname) {
        this.userFullname = userFullname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public Timestamp getEnrollDate() {
        return enrollDate;
    }

    public void setEnrollDate(Timestamp enrollDate) {
        this.enrollDate = enrollDate;
    }

    public UserStatus getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(UserStatus userStatus) {
        this.userStatus = userStatus;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    @Override
    public String toString() {
        return "MemberDTO{" +
                "userId=" + userId +
                ", userFullname='" + userFullname + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", userNickname='" + userNickname + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userPhone='" + userPhone + '\'' +
                ", enrollDate=" + enrollDate +
                ", userStatus=" + userStatus +
                ", userRole='" + userRole + '\'' +
                '}';
    }
}
