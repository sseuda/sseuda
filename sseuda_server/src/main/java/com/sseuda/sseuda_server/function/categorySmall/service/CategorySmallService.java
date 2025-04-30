package com.sseuda.sseuda_server.function.categorySmall.service;

import com.sseuda.sseuda_server.function.categorySmall.dao.CategorySmallMapper;
import com.sseuda.sseuda_server.function.categorySmall.dto.CategorySmallDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategorySmallService {

    private final Logger log = LoggerFactory.getLogger(CategorySmallService.class);
    private CategorySmallMapper categorySmallMapper;

    @Autowired
    public CategorySmallService(CategorySmallMapper categorySmallMapper) {
        this.categorySmallMapper = categorySmallMapper;
    }

//    소분류 카테고리 전체 조회
    public List<CategorySmallDTO> findCategorySmallList(){

        return categorySmallMapper.findCategorySmallList();
    }

//    소분류 카테고리 삭제
    public int deleteCategorySmallCode(int smallCode) {
        log.info("[CSController] 소분류 카테고리 삭제 시작...");

        return categorySmallMapper.deleteCategorySmallCode(smallCode);
    }
}
