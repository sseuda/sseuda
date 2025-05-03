package com.sseuda.sseuda_server.config;

import com.sseuda.sseuda_server.member.exception.AuthFailHandler;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private AuthFailHandler authFailHandler;

    public SecurityConfig(AuthFailHandler authFailHandler) { this.authFailHandler = authFailHandler; }

    @Bean
        public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    // SecurityConfig 설정이 아직 되어있지 않을 때 로그인을 하지 않으면 보안상 api test를 못해서 아래 코드 사용해 비활성화
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // CSRF 보호 끄기 (프론트엔드 연결 편하게)
                .authorizeHttpRequests(authz -> authz
                        .anyRequest().permitAll() // 모든 요청 인증 없이 허용
                );
        return http.build();
    }


}
