package com.sseuda.sseuda_server.function.categoryBig.controller;

import com.sseuda.sseuda_server.common.ResponseDTO;
import com.sseuda.sseuda_server.function.categoryBig.service.CategoryBigService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/*")
public class CategoryBigController {

    private static final Logger log = LoggerFactory.getLogger(CategoryBigController.class);
    private final CategoryBigService categoryBigService;

    @Autowired
    public CategoryBigController(CategoryBigService categoryBigService) {
        this.categoryBigService = categoryBigService;
    }

    @Operation(summary = "대분류 카테고리 전체 조회", description = "대분류 카테고리 전체 조회", tags = { "CategoryBigController" })
    @GetMapping("/mypage")
    public ResponseEntity<ResponseDTO> findBigCategory(){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", categoryBigService.findBigCategory()));

    }

}
