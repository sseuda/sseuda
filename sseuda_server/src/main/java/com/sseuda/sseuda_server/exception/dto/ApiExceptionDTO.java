package com.sseuda.sseuda_server.exception.dto;

import org.springframework.http.HttpStatus;

//  예외 발생 시 프론트로 보낼 데이터를 담는 DTO 객체
public class ApiExceptionDTO {

    private int status;     //  상태코드
    private String message; //  에러 메시지

    public ApiExceptionDTO() {
    }

    public ApiExceptionDTO(HttpStatus status, String message) {
        this.status = status.value();
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "ApiExceptionDTO{" +
                "status=" + status +
                ", message='" + message + '\'' +
                '}';
    }
}
