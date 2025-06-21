package com.sseuda.sseuda_server.function.likes.dto;

import java.sql.Timestamp;

public class LikesDTO {

    private int likesId;
    private Timestamp likesCreateAt;
    private int postId;
    private  int userId;

    public LikesDTO() {
    }

    public LikesDTO(int likesId, Timestamp likesCreateAt, int postId, int userId) {
        this.likesId = likesId;
        this.likesCreateAt = likesCreateAt;
        this.postId = postId;
        this.userId = userId;
    }

    public int getLikesId() {
        return likesId;
    }

    public void setLikesId(int likesId) {
        this.likesId = likesId;
    }

    public Timestamp getLikesCreateAt() {
        return likesCreateAt;
    }

    public void setLikesCreateAt(Timestamp likesCreateAt) {
        this.likesCreateAt = likesCreateAt;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "LikesDTO{" +
                "likesId=" + likesId +
                ", likesCreateAt=" + likesCreateAt +
                ", postId=" + postId +
                ", userId=" + userId +
                '}';
    }
}
