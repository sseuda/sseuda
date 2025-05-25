package com.sseuda.sseuda_server.function.category.controller;

import com.sseuda.sseuda_server.common.ResponseDTO;
import com.sseuda.sseuda_server.function.category.dto.CategoryBigDTO;
import com.sseuda.sseuda_server.function.category.dto.CategorySmallDTO;
import com.sseuda.sseuda_server.function.category.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mypage/*")
public class CategoryController {

    private static final Logger log = LoggerFactory.getLogger(CategoryController.class);
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Operation(summary = "카테고리 전체 조회", description = "카테고리 전체 조회가 진행됩니다.", tags = { "CategoryController" })
    @GetMapping("/userpage")
    public ResponseEntity<ResponseDTO> findCategoryList(){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "카테고리 조회 성공", categoryService.findCategoryList()));
    }


    @Operation(summary = "상위 카테고리 등록", description = "상위 카테고리 등록이 진행됩니다.", tags = {"CategoryController"})
    @PostMapping("/insert")
    public ResponseEntity<String> insertBigCategory(@ModelAttribute CategoryBigDTO category) {

        int result = categoryService.insertBigCategory(category);

        if(result > 0){
            return ResponseEntity.ok("카테고리가 등록되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("카테고리 등록에 실패했습니다.");
        }
    }

    @Operation(summary = "하위 카테고리 등록", description = "하위 카테고리 등록이 진행됩니다.", tags = {"CategoryController"})
    @PostMapping("/insert/small")
    public ResponseEntity<String> insertSmallCategory(@ModelAttribute CategorySmallDTO category) {

        int result = categoryService.insertSmallCategory(category);

        if(result > 0){
            return ResponseEntity.ok("카테고리가 등록되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("카테고리 등록에 실패했습니다.");
        }
    }


    @Operation(summary = "상위 카테고리 수정", description = "상위 카테고리 이름 수정이 진행됩니다.", tags = {"CategoryController"})
    @PutMapping("/update")
    public ResponseEntity<String> updateBigCategory(@ModelAttribute CategoryBigDTO category){

        int result = categoryService.updateBigCategory(category);

        if(result > 0){
            return ResponseEntity.ok("카테고리 수정이 완료되었습니다.");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("수정이 취소되었습니다.");
        }
    }

    @Operation(summary = "하위 카테고리 수정", description = "하위 카테고리 이름 수정이 진행됩니다.", tags = {"CategoryController"})
    @PutMapping("/update/small")
    public ResponseEntity<String> updateSmallCategory(@ModelAttribute CategorySmallDTO category){

        int result = categoryService.updateSmallCategory(category);

        if(result > 0){
            return ResponseEntity.ok("카테고리 수정이 완료되었습니다.");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("수정이 취소되었습니다.");
        }
    }


    @Operation(summary = "카테고리 전체 삭제", description = "상위 카테고리 삭제가 진행됩니다.", tags = {"CategoryController"})
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCategory(@ModelAttribute CategoryBigDTO category){

        int result = categoryService.deleteCategory(category);

        log.info("result : {}", result);

        if(result > 0){
            return ResponseEntity.ok("카테고리가 삭제되었습니다.");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("찾을 수 없는 카테고리입니다.");
        }
    }

    @Operation(summary = "하위 카테고리 삭제", description = "하위 카테고리 삭제가 진행됩니다.", tags = {"CategoryController"})
    @DeleteMapping("/delete/small")
    public ResponseEntity<String> deleteSmallCategory(@ModelAttribute CategorySmallDTO category){

        int result = categoryService.deleteSmallCategory(category);

        log.info("result : {}", result);

        if(result > 0){
            return ResponseEntity.ok("카테고리가 삭제되었습니다.");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("찾을 수 없는 카테고리입니다.");
        }
    }
}
