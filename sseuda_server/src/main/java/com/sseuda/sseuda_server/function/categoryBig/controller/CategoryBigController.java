package com.sseuda.sseuda_server.function.categoryBig.controller;

import com.sseuda.sseuda_server.common.ResponseDTO;
import com.sseuda.sseuda_server.function.categoryBig.dto.CategoryBigDTO;
import com.sseuda.sseuda_server.function.categoryBig.service.CategoryBigService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


    @Operation(summary = "대분류 카테고리 생성", description = "대분류 카테고리 생성이 진행됩니다.", tags = {"CategoryBigController"})
    @PostMapping("/insert")
    public ResponseEntity<String> insertBigCategory(@ModelAttribute CategoryBigDTO categoryBigDTO) {

        int result = categoryBigService.insertBigCategory(categoryBigDTO);

        if(result > 0){
            return ResponseEntity.ok("카테고리가 생성되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("카테고리 생성에 실패했습니다.");
        }
    }


    @Operation(summary = "대분류 카테고리 수정", description = "대분류 카테고리 이름 수정이 진행됩니다.", tags = {"CategoryBigController"})
    @PutMapping("/mypage/update")
    public ResponseEntity<String> updateBigCategory(@ModelAttribute CategoryBigDTO categoryBigDTO){

        int result = categoryBigService.updateBigCategory(categoryBigDTO);

        if(result > 0){
            return ResponseEntity.ok("카테고리 수정이 완료되었습니다.");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("수정이 취소되었습니다.");
        }
    }


    @Operation(summary = "대분류 카테고리 삭제", description = "대분류 카테고리 삭제가 진행됩니다.", tags = {"CategoryBigController"})
    @DeleteMapping("/mypage/delete")
    public ResponseEntity<String> deleteBigCategory(@ModelAttribute CategoryBigDTO categoryBigDTO){

        int result = categoryBigService.deleteBigCategory(categoryBigDTO);

        log.info("result : {}", result);

        if(result > 0){
            return ResponseEntity.ok("카테고리가 삭제되었습니다.");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("찾을 수 없는 카테고리입니다.");
        }
    }

}


