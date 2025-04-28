package com.sseuda.sseuda_server.function.categorySmall.dto;

public class CategorySmallDTO {

    private int smallCategoryId;
    private String smallCategoryName;
    private int bigCategoryId;

    public CategorySmallDTO() {
    }

    public CategorySmallDTO(int smallCategoryId, String smallCategoryName, int bigCategoryId) {
        this.smallCategoryId = smallCategoryId;
        this.smallCategoryName = smallCategoryName;
        this.bigCategoryId = bigCategoryId;
    }

    public int getSmallCategoryId() {
        return smallCategoryId;
    }

    public void setSmallCategoryId(int smallCategoryId) {
        this.smallCategoryId = smallCategoryId;
    }

    public String getSmallCategoryName() {
        return smallCategoryName;
    }

    public void setSmallCategoryName(String smallCategoryName) {
        this.smallCategoryName = smallCategoryName;
    }

    public int getBigCategoryId() {
        return bigCategoryId;
    }

    public void setBigCategoryId(int bigCategoryId) {
        this.bigCategoryId = bigCategoryId;
    }

    @Override
    public String toString() {
        return "CategorySmallDTO{" +
                "smallCategoryId=" + smallCategoryId +
                ", smallCategoryName='" + smallCategoryName + '\'' +
                ", bigCategoryId=" + bigCategoryId +
                '}';
    }
}
