package com.sseuda.sseuda_server.function.categoryBig.controller;

import com.sseuda.sseuda_server.common.ResponseDTO;
import com.sseuda.sseuda_server.function.categoryBig.service.CategoryBigService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/*")
public class CategoryBigController {

    private static final Logger log = LoggerFactory.getLogger(CategoryBigController.class);
    private final CategoryBigService categoryBigService;

    @Autowired
    public CategoryBigController(CategoryBigService categoryBigService) {
        this.categoryBigService = categoryBigService;
    }

    @Operation(summary = "대분류 카테고리 전체 조회", description = "대분류 카테고리 전체 조회가 진행됩니다.", tags = { "CategoryBigController" })
    @GetMapping("/mypage")
    public ResponseEntity<ResponseDTO> findBigCategoryLiat(){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "대분류 카테고리 조회 성공", categoryBigService.findBigCategoryLiat()));

    }

//    하위에 소분류 카테고리가 있을때도 생각해야함
    @Operation(summary = "대분류 카테고리 삭제", description = "대분류 카테고리 삭제가 진행됩니다.", tags = {"CategoryBigController"})
    @DeleteMapping("/mypage/delete")
    public ResponseEntity<String> deleteBigCategory(@RequestParam("bigCode") int bigCode){

        int result = categoryBigService.deleteBigCategory(bigCode);

        if(result > 0){
            return ResponseEntity.ok("카테고리가 삭제되었습니다.");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("찾을 수 없는 카테고리입니다.");
        }
    }

}
