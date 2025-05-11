package com.sseuda.sseuda_server.function.category.service;

import com.sseuda.sseuda_server.function.category.dao.CategoryMapper;
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

    public List<CategorySmallDTO> findCategoryList(){

        log.info("[CService] 전체 카테고리 조회중...");
        return categoryMapper.findCategoryList();
    }
}
