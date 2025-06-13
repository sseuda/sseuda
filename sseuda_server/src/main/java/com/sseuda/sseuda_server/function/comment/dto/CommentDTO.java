package com.sseuda.sseuda_server.function.comment.dto;

import java.sql.Timestamp;

public class CommentDTO {

    private int commentId;
    private String commentText;
    private Timestamp commentCreateAt;
    private Timestamp commentUpdateAt;
    private String commentDelete;
    private int postId;
    private int userId;

    public CommentDTO() {
    }

    public CommentDTO(int commentId, String commentText, Timestamp commentCreateAt, Timestamp commentUpdateAt, String commentDelete, int postId, int userId) {
        this.commentId = commentId;
        this.commentText = commentText;
        this.commentCreateAt = commentCreateAt;
        this.commentUpdateAt = commentUpdateAt;
        this.commentDelete = commentDelete;
        this.postId = postId;
        this.userId = userId;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public Timestamp getCommentCreateAt() {
        return commentCreateAt;
    }

    public void setCommentCreateAt(Timestamp commentCreateAt) {
        this.commentCreateAt = commentCreateAt;
    }

    public Timestamp getCommentUpdateAt() {
        return commentUpdateAt;
    }

    public void setCommentUpdateAt(Timestamp commentUpdateAt) {
        this.commentUpdateAt = commentUpdateAt;
    }

    public String getCommentDelete() {
        return commentDelete;
    }

    public void setCommentDelete(String commentDelete) {
        this.commentDelete = commentDelete;
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
        return "CommentDTO{" +
                "commentId=" + commentId +
                ", commentText='" + commentText + '\'' +
                ", commentCreateAt=" + commentCreateAt +
                ", commentUpdateAt=" + commentUpdateAt +
                ", commentDelete='" + commentDelete + '\'' +
                ", postId=" + postId +
                ", userId=" + userId +
                '}';
    }
}
