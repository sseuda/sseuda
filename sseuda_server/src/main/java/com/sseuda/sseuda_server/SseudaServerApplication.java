package com.sseuda.sseuda_server;

import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.sseuda.sseuda_server", annotationClass = Mapper.class)
public class SseudaServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SseudaServerApplication.class, args);
    }

}