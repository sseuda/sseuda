package com.sseuda.sseuda_server.function.member.service;

import com.sseuda.sseuda_server.function.member.dto.MailRequestDTO;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendSimpleMessage(MailRequestDTO request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(request.getTo());
        message.setSubject(request.getSubject());
        message.setText(request.getText());
        message.setFrom("jieune120@gmail.com");
        mailSender.send(message);
    }

    // 메일로 링크 전송
    public void sendPasswordEmail(String email, String token) {

        String subject = "[쓰다] 비밀번호 재설정";
        String resetLink = "http://localhost:3000/member/reset-password?token=" + token;
        String body = "아래 링크를 클릭하여 비밀번호를 재설정하세요:\n\n" + resetLink +
                "\n\n해당 링크는 30분 동안 유효합니다.";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}

