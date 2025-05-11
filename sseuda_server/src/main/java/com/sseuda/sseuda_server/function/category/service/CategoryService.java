package com.sseuda.sseuda_server.function.category.service;

import com.sseuda.sseuda_server.function.category.dao.CategoryMapper;
import com.sseuda.sseuda_server.function.category.dto.CategoryBigDTO;
import com.sseuda.sseuda_server.function.category.dto.CategorySmallDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final Logger log = LoggerFactory.getLogger(CategoryService.class);
    private CategoryMapper categoryMapper;

    @Autowired
    public CategoryService(CategoryMapper categoryMapper) {
        this.categoryMapper = categoryMapper;
    }

//    카테고리 전체 조회
    public List<CategorySmallDTO> findCategoryList(){

        log.info("[CService] 전체 카테고리 조회중...");
        return categoryMapper.findCategoryList();
    }


//    대분류 카테고리 등록
    public int insertBigCategory(CategoryBigDTO category){

        log.info("[CService] 대분류 카테고리 등록중...");
        return categoryMapper.insertBigCategory(category);
    }

//    소분류 카테고리 등록
    public int insertSmallCategory(CategorySmallDTO category){

        log.info("[CService] 소분류 카테고리 등록중...");
        return categoryMapper.insertSmallCategory(category);
    }


    //    대분류 카테고리 수정
    public int updateBigCategory(CategoryBigDTO category){

        log.info("[CBService] 대분류 카테고리 수정 진행중...");
        return categoryMapper.updateBigCategory(category);
    }

    //    소분류 카테고리 수정
    public int updateSmallCategory(CategorySmallDTO category){

        log.info("[CBService] 소분류 카테고리 수정 진행중...");
        return categoryMapper.updateSmallCategory(category);
    }

}
