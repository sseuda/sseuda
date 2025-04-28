package com.sseuda.sseuda_server.function.categorySmall.controller;

import com.sseuda.sseuda_server.common.ResponseDTO;
import com.sseuda.sseuda_server.function.categorySmall.service.CategorySmallService;
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
public class CategorySmallController {

    private static final Logger log = LoggerFactory.getLogger(CategorySmallController.class);
    private final CategorySmallService categorySmallService;

    @Autowired
    public CategorySmallController(CategorySmallService categorySmallService) {
        this.categorySmallService = categorySmallService;
    }

    @Operation(summary = "소분류 카테고리 전체 조회", description = "소분류 카테고리 조회", tags = {"CategorySmallController"})
    @GetMapping("/mypage")
    public ResponseEntity<ResponseDTO> findCategorySmallList(){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", categorySmallService.findCategorySmallList()));
    }
}
