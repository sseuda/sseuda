package com.sseuda.sseuda_server.function.categoryBig.dao;

import com.sseuda.sseuda_server.function.categoryBig.dto.CategoryBigDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryBigMapper {

//    대분류 카테고리 전체 조회
    List<CategoryBigDTO> findBigCategoryLiat();

//    대분류 카테고리 등록
    List<CategoryBigDTO> insertBigCategory(int userCode);

//    대분류 카테고리 삭제
    int deleteBigCategory(int bigCode);
}