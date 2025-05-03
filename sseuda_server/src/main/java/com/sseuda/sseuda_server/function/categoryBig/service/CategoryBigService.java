package com.sseuda.sseuda_server.function.categoryBig.service;

import com.sseuda.sseuda_server.function.categoryBig.dao.CategoryBigMapper;
import com.sseuda.sseuda_server.function.categoryBig.dto.CategoryBigDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryBigService {

    private static final Logger log = LoggerFactory.getLogger(CategoryBigService.class);
    private final CategoryBigMapper categoryBigMapper;

    @Autowired
    public CategoryBigService(CategoryBigMapper categoryBigMapper) {
        this.categoryBigMapper = categoryBigMapper;
    }

//    대분류 카테고리 전체 조회
    public List<CategoryBigDTO> findBigCategoryLiat(){

        return categoryBigMapper.findBigCategoryLiat();
    }

//    대분류 카테고리 등록
    public List<CategoryBigDTO> insertBigCategory(int userCode){

        return categoryBigMapper.insertBigCategory(2);
    }

//    대분류 카테고리 삭제
//    public int deleteBigCategory(int bigCode){
//
//        log.info("[CBService] 대분류 카테고리 삭제 진행중...");
//        return categoryBigMapper.deleteBigCategory(bigCode);
//    }
}
