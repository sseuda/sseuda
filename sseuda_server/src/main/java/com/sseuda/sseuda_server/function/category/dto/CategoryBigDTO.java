package com.sseuda.sseuda_server.function.category.dto;

public class CategoryBigDTO {

    private int bigCategoryId;
    private String bigCategoryName;

    public CategoryBigDTO() {
    }

    public CategoryBigDTO(int bigCategoryId, String bigCategoryName) {
        this.bigCategoryId = bigCategoryId;
        this.bigCategoryName = bigCategoryName;
    }

    public int getBigCategoryId() {
        return bigCategoryId;
    }

    public void setBigCategoryId(int bigCategoryId) {
        this.bigCategoryId = bigCategoryId;
    }

    public String getBigCategoryName() {
        return bigCategoryName;
    }

    public void setBigCategoryName(String bigCategoryName) {
        this.bigCategoryName = bigCategoryName;
    }

    @Override
    public String toString() {
        return "CategoryBigDTO{" +
                "bigCategoryId=" + bigCategoryId +
                ", bigCategoryName='" + bigCategoryName + '\'' +
                '}';
    }
}