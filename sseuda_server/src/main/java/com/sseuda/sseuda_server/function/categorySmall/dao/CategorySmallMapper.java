package com.sseuda.sseuda_server.function.categorySmall.dao;

import com.sseuda.sseuda_server.function.categorySmall.dto.CategorySmallDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CategorySmallMapper {

//    소분류 카테고리 전체 조회
    List<CategorySmallDTO> findCategorySmallList();

//    소분류 카테고리 삭제
    int deleteCategorySmallCode(int smallCode);

//    소분류 카테고리 등록
    int insertCategorySmallCode(int userCode);
}
