package com.sseuda.sseuda_server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private static final String ADD_RESOURCE_HANDLER = "/sseudaimgs/**";
    private static final String ADD_RESOURCE_LOCATION =
            "file:" + System.getProperty("user.dir") + "/sseudaimgs/";

    // 정적 파일을 관리하는 핸들러
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(ADD_RESOURCE_HANDLER)
                .addResourceLocations(ADD_RESOURCE_LOCATION);
    }
}
