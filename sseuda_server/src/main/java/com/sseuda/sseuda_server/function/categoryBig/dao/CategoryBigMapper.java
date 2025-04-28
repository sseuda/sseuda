package com.sseuda.sseuda_server.function.categoryBig.dao;

import com.sseuda.sseuda_server.function.categoryBig.dto.CategoryBigDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryBigMapper {

    List<CategoryBigDTO> findBigCategory();
}