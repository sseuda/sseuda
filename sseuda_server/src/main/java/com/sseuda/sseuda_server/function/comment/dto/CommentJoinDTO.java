package com.sseuda.sseuda_server.function.comment.dto;

import com.sseuda.sseuda_server.function.member.dto.MemberDTO;
import com.sseuda.sseuda_server.function.post.dto.PostDTO;

import java.sql.Timestamp;

public class CommentJoinDTO {

    private int commentId;
    private String commentText;
    private Timestamp commentCreateAt;
    private Timestamp commentUpdateAt;
    private String commentDelete;
    private PostDTO postDTO;
    private MemberDTO memberDTO;

    public CommentJoinDTO() {
    }

    public CommentJoinDTO(int commentId, String commentText, Timestamp commentCreateAt, Timestamp commentUpdateAt, String commentDelete, PostDTO postDTO, MemberDTO memberDTO) {
        this.commentId = commentId;
        this.commentText = commentText;
        this.commentCreateAt = commentCreateAt;
        this.commentUpdateAt = commentUpdateAt;
        this.commentDelete = commentDelete;
        this.postDTO = postDTO;
        this.memberDTO = memberDTO;
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

    public PostDTO getPostDTO() {
        return postDTO;
    }

    public void setPostDTO(PostDTO postDTO) {
        this.postDTO = postDTO;
    }

    public MemberDTO getMemberDTO() {
        return memberDTO;
    }

    public void setMemberDTO(MemberDTO memberDTO) {
        this.memberDTO = memberDTO;
    }

    @Override
    public String toString() {
        return "CommentJoinDTO{" +
                "commentId=" + commentId +
                ", commentText='" + commentText + '\'' +
                ", commentCreateAt=" + commentCreateAt +
                ", commentUpdateAt=" + commentUpdateAt +
                ", commentDelete='" + commentDelete + '\'' +
                ", postDTO=" + postDTO +
                ", memberDTO=" + memberDTO +
                '}';
    }
}
