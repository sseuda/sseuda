package com.sseuda.sseuda_server.util;

import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class ImageUploadController {

    private static final String UPLOAD_DIR = "sseudaimgs/";

    @PostMapping("/sseudaimgs")
    public ResponseEntity<?> uploadImage(@RequestPart("image") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("파일이 없습니다");
        }

        try {
            // 저장할 폴더 없으면 생성
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }

            // 원본 파일명에서 확장자 추출
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String fileExtension = "";

            int dotIndex = originalFilename.lastIndexOf(".");
            if (dotIndex > 0) {
                fileExtension = originalFilename.substring(dotIndex);
            }

            // 저장할 파일명 생성 (예: timestamp + 확장자)
            String fileName = System.currentTimeMillis() + fileExtension;

            // 실제 저장 경로
            Path filePath = Paths.get(UPLOAD_DIR + fileName);

            // 파일 저장
            Files.write(filePath, file.getBytes());

            // 클라이언트에 전달할 이미지 URL (필요에 따라 도메인이나 contextPath 추가)
            String imageUrl = "/sseudaimgs/" + fileName;

            // JSON 형태로 반환
            return ResponseEntity.ok().body(new ImageUploadResponse(imageUrl));

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("파일 저장 실패");
        }
    }

    // 내부 클래스 (Response DTO)
    static class ImageUploadResponse {
        private String url;

        public ImageUploadResponse(String url) {
            this.url = url;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }
}
