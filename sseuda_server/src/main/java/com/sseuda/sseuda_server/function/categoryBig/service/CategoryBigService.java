package com.sseuda.sseuda_server.function.categoryBig.service;

import com.sseuda.sseuda_server.function.categoryBig.dao.CategoryBigMapper;
import com.sseuda.sseuda_server.function.categoryBig.dto.CategoryBigDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryBigService {

    private final CategoryBigMapper categoryBigMapper;

    @Autowired
    public CategoryBigService(CategoryBigMapper categoryBigMapper) {
        this.categoryBigMapper = categoryBigMapper;
    }

    public List<CategoryBigDTO> findBigCategory(){

        return categoryBigMapper.findBigCategory();
    }
}
