package com.sseuda.sseuda_server.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(title = "sseuda 서비스 API 명세서",
                     description = "React부터 Mybatis까지 진행하는 서비스 API 명세서",
                     version = "v1"))

@Configuration
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi chatOpenApi(){

        String [] paths = {"/api/**", "/auth/**"};

        return GroupedOpenApi.builder()
                .group("sseuda 서비스 API v1")
                .pathsToMatch(paths)
                .build();
    }
}
