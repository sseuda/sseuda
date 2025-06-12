package com.sseuda.sseuda_server.function.post.dto;

import com.sseuda.sseuda_server.function.member.dto.MemberDTO;
import org.springframework.web.multipart.MultipartFile;

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
    private MemberDTO memberDTO;

    private MultipartFile image;

    public PostDTO() {
    }

    public PostDTO(int postId, String postTitle, int userId, String postContent, Timestamp postCreateAt, Timestamp postUpdateAt, int viewCount, String postDelete, int smallCategoryId, MemberDTO memberDTO, MultipartFile image) {
        this.postId = postId;
        this.postTitle = postTitle;
        this.userId = userId;
        this.postContent = postContent;
        this.postCreateAt = postCreateAt;
        this.postUpdateAt = postUpdateAt;
        this.viewCount = viewCount;
        this.postDelete = postDelete;
        this.smallCategoryId = smallCategoryId;
        this.memberDTO = memberDTO;
        this.image = image;
    }

    public int getPostId() {
        return postId;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public int getUserId() {
        return userId;
    }

    public String getPostContent() {
        return postContent;
    }

    public Timestamp getPostCreateAt() {
        return postCreateAt;
    }

    public Timestamp getPostUpdateAt() {
        return postUpdateAt;
    }

    public int getViewCount() {
        return viewCount;
    }

    public String getPostDelete() {
        return postDelete;
    }

    public int getSmallCategoryId() {
        return smallCategoryId;
    }

    public MemberDTO getMemberDTO() {
        return memberDTO;
    }

    public MultipartFile getImage() {
        return image;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setPostContent(String postContent) {
        this.postContent = postContent;
    }

    public void setPostCreateAt(Timestamp postCreateAt) {
        this.postCreateAt = postCreateAt;
    }

    public void setPostUpdateAt(Timestamp postUpdateAt) {
        this.postUpdateAt = postUpdateAt;
    }

    public void setViewCount(int viewCount) {
        this.viewCount = viewCount;
    }

    public void setPostDelete(String postDelete) {
        this.postDelete = postDelete;
    }

    public void setSmallCategoryId(int smallCategoryId) {
        this.smallCategoryId = smallCategoryId;
    }

    public void setMemberDTO(MemberDTO memberDTO) {
        this.memberDTO = memberDTO;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
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
                ", memberDTO=" + memberDTO +
                ", image=" + image +
                '}';
    }
}

