package com.sseuda.sseuda_server.function.alarm.dto;

import java.sql.Timestamp;

public class AlarmDTO {

    private int alarmId;
    private String alarmType;
    private String alarmDetail;
    private int userId;
    private int postId;
    private int commentId;
    private int likesId;
    private Timestamp createdAt;
    private String userNickname;

    public AlarmDTO() {
    }

    public AlarmDTO(int alarmId, String alarmType, String alarmDetail, int userId, int postId, int commentId, int likesId, Timestamp createdAt, String userNickname) {
        this.alarmId = alarmId;
        this.alarmType = alarmType;
        this.alarmDetail = alarmDetail;
        this.userId = userId;
        this.postId = postId;
        this.commentId = commentId;
        this.likesId = likesId;
        this.createdAt = createdAt;
        this.userNickname = userNickname;
    }

    public AlarmDTO(int alarmId, String alarmType, String alarmDetail, int userId, int postId, int commentId, int likesId, Timestamp createdAt) {
        this.alarmId = alarmId;
        this.alarmType = alarmType;
        this.alarmDetail = alarmDetail;
        this.userId = userId;
        this.postId = postId;
        this.commentId = commentId;
        this.likesId = likesId;
        this.createdAt = createdAt;
    }

    public int getAlarmId() {
        return alarmId;
    }

    public void setAlarmId(int alarmId) {
        this.alarmId = alarmId;
    }

    public String getAlarmType() {
        return alarmType;
    }

    public void setAlarmType(String alarmType) {
        this.alarmType = alarmType;
    }

    public String getAlarmDetail() {
        return alarmDetail;
    }

    public void setAlarmDetail(String alarmDetail) {
        this.alarmDetail = alarmDetail;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public int getLikesId() {
        return likesId;
    }

    public void setLikesId(int likesId) {
        this.likesId = likesId;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }

    @Override
    public String toString() {
        return "AlarmDTO{" +
                "alarmId=" + alarmId +
                ", alarmType='" + alarmType + '\'' +
                ", alarmDetail='" + alarmDetail + '\'' +
                ", userId=" + userId +
                ", postId=" + postId +
                ", commentId=" + commentId +
                ", likesId=" + likesId +
                ", createdAt=" + createdAt +
                ", userNickname='" + userNickname + '\'' +
                '}';
    }
}
