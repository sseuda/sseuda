package com.sseuda.sseuda_server.function.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MailRequestDTO {

    private String to;
    private String fullname;
    private String subject;
    private String text;
}
