package com.sseuda.sseuda_server.function.category.dao;

import com.sseuda.sseuda_server.function.category.dto.CategoryBigDTO;
import com.sseuda.sseuda_server.function.category.dto.CategorySmallDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {

//    카테고리 전체 조회
    List<CategorySmallDTO> findCategoryList();

//  상위이 카테고리 전체 조회
    List<CategoryBigDTO> findBigCategoryList();

//    상위 카테고리 등록
    int insertBigCategory(CategoryBigDTO category);

//    하위 카테고리 등록
    int insertSmallCategory(CategorySmallDTO category);


//    상위 카테고리 수정
    int updateBigCategory(CategoryBigDTO category);

//    하위 카테고리 수정
    int updateSmallCategory(CategorySmallDTO category);


//    카테고리 전체 삭제
    int deleteCategory(CategoryBigDTO category);

//    하위 카테고리 삭제
    int deleteSmallCategory(CategorySmallDTO category);


}
