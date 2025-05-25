package com.sseuda.sseuda_server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("file:///springboot-app/sseudaimgs/")
    private String ADD_RESOURCE_LOCATION;

    @Value("/sseudaimgs/**")
    private String ADD_RESOURCE_HANDLER;

    // 정적 파일을 관리하는 핸들러
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(ADD_RESOURCE_HANDLER)
                .addResourceLocations(ADD_RESOURCE_LOCATION);
    }
}
