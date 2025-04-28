package com.sseuda.sseuda_server.exception.dto;

import org.springframework.http.HttpStatus;

public class ApiExceptionDTO {

    private int status;
    private String message;

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
