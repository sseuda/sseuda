package com.sseuda.sseuda_server.function.alarm.dto;

import java.sql.Timestamp;

public class AlarmDTO {

    private int alarmId;
    private String alarmType;
    private int userId;
    private int postId;
    private int commentId;
    private int likesId;
    private Timestamp createdAt;
//    private String userNickname;
    private String commentUserNickname;
    private String likeUserNickname;
    private String alarmCheck;

    public AlarmDTO() {
    }

    public AlarmDTO(int alarmId, String alarmType, int userId, int postId, int commentId, int likesId, Timestamp createdAt, String commentUserNickname, String likeUserNickname, String alarmCheck) {
        this.alarmId = alarmId;
        this.alarmType = alarmType;
        this.userId = userId;
        this.postId = postId;
        this.commentId = commentId;
        this.likesId = likesId;
        this.createdAt = createdAt;
        this.commentUserNickname = commentUserNickname;
        this.likeUserNickname = likeUserNickname;
        this.alarmCheck = alarmCheck;
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

    public String getCommentUserNickname() {
        return commentUserNickname;
    }

    public void setCommentUserNickname(String commentUserNickname) {
        this.commentUserNickname = commentUserNickname;
    }

    public String getLikeUserNickname() {
        return likeUserNickname;
    }

    public void setLikeUserNickname(String likeUserNickname) {
        this.likeUserNickname = likeUserNickname;
    }

    public String getAlarmCheck() {
        return alarmCheck;
    }

    public void setAlarmCheck(String alarmCheck) {
        this.alarmCheck = alarmCheck;
    }

    @Override
    public String toString() {
        return "AlarmDTO{" +
                "alarmId=" + alarmId +
                ", alarmType='" + alarmType + '\'' +
                ", userId=" + userId +
                ", postId=" + postId +
                ", commentId=" + commentId +
                ", likesId=" + likesId +
                ", createdAt=" + createdAt +
                ", commentUserNickname='" + commentUserNickname + '\'' +
                ", likeUserNickname='" + likeUserNickname + '\'' +
                ", alarmCheck='" + alarmCheck + '\'' +
                '}';
    }
}