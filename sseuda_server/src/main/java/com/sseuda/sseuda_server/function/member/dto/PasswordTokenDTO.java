package com.sseuda.sseuda_server.function.member.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PasswordTokenDTO {

    private Long id;
    private String email;
    private String token;
    private LocalDateTime expiration;
    private LocalDateTime createdAt;
}
