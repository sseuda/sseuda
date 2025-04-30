package com.sseuda.sseuda_server.function.categorySmall.controller;

import com.sseuda.sseuda_server.common.ResponseDTO;
import com.sseuda.sseuda_server.function.categorySmall.dto.CategorySmallDTO;
import com.sseuda.sseuda_server.function.categorySmall.service.CategorySmallService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/*")
public class CategorySmallController {

    private static final Logger log = LoggerFactory.getLogger(CategorySmallController.class);
    private final CategorySmallService categorySmallService;

    @Autowired
    public CategorySmallController(CategorySmallService categorySmallService) {
        this.categorySmallService = categorySmallService;
    }

    @Operation(summary = "소분류 카테고리 전체 조회", description = "카테고리 조회가 진행됩니다", tags = {"CategorySmallController"})
    @GetMapping("/mypage")
    public ResponseEntity<ResponseDTO> findCategorySmallList(){

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "소분류 카테고리 전체 조회 성공", categorySmallService.findCategorySmallList()));
    }

    @Operation(summary = "소분류 카테고리 삭제", description = "카테고리 삭제가 진행됩니다", tags = {"CategorySmallController"})
    @DeleteMapping(value = "/mypage/delete")
    public ResponseEntity<String> deleteCategorySmallCode(@RequestParam ("smallCode") int smallCode){

        int result = categorySmallService.deleteCategorySmallCode(smallCode);

        log.info("[CSController] smallCode: {}", result);

        if(result > 0){
            return ResponseEntity.ok("소분류 카테고리 삭제 성공");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("찾을 수 없는 카테고리입니다.");
        }

    }
}
