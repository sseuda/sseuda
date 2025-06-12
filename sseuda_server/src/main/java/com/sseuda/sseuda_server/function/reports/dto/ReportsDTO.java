package com.sseuda.sseuda_server.function.reports.dto;

import java.sql.Timestamp;

public class ReportsDTO {

    private int reportsId;
    private int reporterId;
    private int reportedId;
    private int postId;
    private Integer commentId;
    private Timestamp reportsCreateAt;
    private String reasonCode;
    private String reasonDetail;
    private String reportsStatus;

    public ReportsDTO() {
    }

    public ReportsDTO(int reportsId, int reporterId, int reportedId, int postId, Integer commentId, Timestamp reportsCreateAt, String reasonCode, String reasonDetail, String reportsStatus) {
        this.reportsId = reportsId;
        this.reporterId = reporterId;
        this.reportedId = reportedId;
        this.postId = postId;
        this.commentId = commentId;
        this.reportsCreateAt = reportsCreateAt;
        this.reasonCode = reasonCode;
        this.reasonDetail = reasonDetail;
        this.reportsStatus = reportsStatus;
    }

    public int getReportsId() {
        return reportsId;
    }

    public void setReportsId(int reportId) {
        this.reportsId = reportId;
    }

    public int getReporterId() {
        return reporterId;
    }

    public void setReporterId(int reporterId) {
        this.reporterId = reporterId;
    }

    public int getReportedId() {
        return reportedId;
    }

    public void setReportedId(int reportedId) {
        this.reportedId = reportedId;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public Integer getCommentId() {
        return commentId;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public Timestamp getReportsCreateAt() {
        return reportsCreateAt;
    }

    public void setReportsCreateAt(Timestamp reportsCreateAt) {
        this.reportsCreateAt = reportsCreateAt;
    }

    public String getReasonCode() {
        return reasonCode;
    }

    public void setReasonCode(String reasonCode) {
        this.reasonCode = reasonCode;
    }

    public String getReasonDetail() {
        return reasonDetail;
    }

    public void setReasonDetail(String reasonDetail) {
        this.reasonDetail = reasonDetail;
    }

    public String getReportsStatus() {
        return reportsStatus;
    }

    public void setReportsStatus(String reportsStatus) {
        this.reportsStatus = reportsStatus;
    }

    @Override
    public String toString() {
        return "ReportsDTO{" +
                "reportId=" + reportsId +
                ", reporterId=" + reporterId +
                ", reportedId=" + reportedId +
                ", postId=" + postId +
                ", commentId=" + commentId +
                ", reportsCreateAt=" + reportsCreateAt +
                ", reasonCode='" + reasonCode + '\'' +
                ", reasonDetail='" + reasonDetail + '\'' +
                ", reportsStatus='" + reportsStatus + '\'' +
                '}';
    }
}


