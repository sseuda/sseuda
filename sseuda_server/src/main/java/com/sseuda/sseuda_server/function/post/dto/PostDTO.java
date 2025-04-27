package com.sseuda.sseuda_server.function.post.dto;

import java.sql.Timestamp;

public class PostDTO {

    private int postId;
    private String postTitle;
    private int userId;
    private String postContent;
    private Timestamp postCreateAt;
    private Timestamp postUpdateAt;
    private int viewCount;
    private String postDelete;
    private int smallCategoryId;

    public PostDTO() {
    }

    public PostDTO(int postId, String postTitle, int userId, String postContent, Timestamp postCreateAt, Timestamp postUpdateAt, int viewCount, String postDelete, int smallCategoryId) {
        this.postId = postId;
        this.postTitle = postTitle;
        this.userId = userId;
        this.postContent = postContent;
        this.postCreateAt = postCreateAt;
        this.postUpdateAt = postUpdateAt;
        this.viewCount = viewCount;
        this.postDelete = postDelete;
        this.smallCategoryId = smallCategoryId;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getPostContent() {
        return postContent;
    }

    public void setPostContent(String postContent) {
        this.postContent = postContent;
    }

    public Timestamp getPostCreateAt() {
        return postCreateAt;
    }

    public void setPostCreateAt(Timestamp postCreateAt) {
        this.postCreateAt = postCreateAt;
    }

    public Timestamp getPostUpdateAt() {
        return postUpdateAt;
    }

    public void setPostUpdateAt(Timestamp postUpdateAt) {
        this.postUpdateAt = postUpdateAt;
    }

    public int getViewCount() {
        return viewCount;
    }

    public void setViewCount(int viewCount) {
        this.viewCount = viewCount;
    }

    public String getPostDelete() {
        return postDelete;
    }

    public void setPostDelete(String postDelete) {
        this.postDelete = postDelete;
    }

    public int getSmallCategoryId() {
        return smallCategoryId;
    }

    public void setSmallCategoryId(int smallCategoryId) {
        this.smallCategoryId = smallCategoryId;
    }

    @Override
    public String toString() {
        return "PostDTO{" +
                "postId=" + postId +
                ", postTitle='" + postTitle + '\'' +
                ", userId=" + userId +
                ", postContent='" + postContent + '\'' +
                ", postCreateAt=" + postCreateAt +
                ", postUpdateAt=" + postUpdateAt +
                ", viewCount=" + viewCount +
                ", postDelete='" + postDelete + '\'' +
                ", smallCategoryId=" + smallCategoryId +
                '}';
    }
}