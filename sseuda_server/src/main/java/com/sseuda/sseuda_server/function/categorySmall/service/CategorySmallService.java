package com.sseuda.sseuda_server.function.categorySmall.service;

import com.sseuda.sseuda_server.function.categorySmall.dao.CategorySmallMapper;
import com.sseuda.sseuda_server.function.categorySmall.dto.CategorySmallDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategorySmallService {

    private final Logger log = LoggerFactory.getLogger(CategorySmallService.class);
    private CategorySmallMapper categorySmallMapper;

    public CategorySmallService(CategorySmallMapper categorySmallMapper) {
        this.categorySmallMapper = categorySmallMapper;
    }

    public List<CategorySmallDTO> findCategorySmallList(){

        return categorySmallMapper.findCategorySmallList();
    }
}
