package com.sseuda.sseuda_server.function.member.controller;

import com.sseuda.sseuda_server.function.member.dto.MailRequestDTO;
import com.sseuda.sseuda_server.function.member.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mail")
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    public ResponseEntity<?> sendMail(@RequestBody MailRequestDTO request) {
        try {
            mailService.sendSimpleMessage(request);
            return ResponseEntity.ok("메일 전송 완료");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("메일 전송 실패");
        }
    }
}
