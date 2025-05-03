package com.sseuda.sseuda_server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

import java.util.Locale;

@Configuration
public class BeanConfig {

    @Bean
    public ReloadableResourceBundleMessageSource messageSource(){

        ReloadableResourceBundleMessageSource source = new ReloadableResourceBundleMessageSource();

        // 메시지 소스의 기본 경로 설정
        source.setBasename("classpath:/messages/message");

        // 메시지 소스의 기본 인코딩 설정
        source.setDefaultEncoding("UTF-8");

        // 메시지 소스를 30초 동안 케싱하도록 설정
        source.setCacheSeconds(30);

        Locale.setDefault(Locale.KOREA);

        return source;
    }

}
