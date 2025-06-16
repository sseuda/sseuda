package com.sseuda.sseuda_server.config;

import com.sseuda.sseuda_server.function.member.service.AuthService;
import com.sseuda.sseuda_server.jwt.JwtAccessDeniedHandler;
import com.sseuda.sseuda_server.jwt.JwtAuthenticationEntryPoint;
import com.sseuda.sseuda_server.jwt.JwtFilter;
import com.sseuda.sseuda_server.jwt.TokenProvider;
import com.sseuda.sseuda_server.function.member.exception.AuthFailHandler;
import com.sseuda.sseuda_server.security.CustomUserDetailsService;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final TokenProvider tokenProvider;
    private final AuthFailHandler authFailHandler;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final CustomUserDetailsService customUserDetailsService;

    public SecurityConfig(TokenProvider tokenProvider, AuthFailHandler authFailHandler, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtAccessDeniedHandler jwtAccessDeniedHandler, CustomUserDetailsService customUserDetailsService) {
        this.tokenProvider = tokenProvider;
        this.authFailHandler = authFailHandler;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
        this.customUserDetailsService = customUserDetailsService;
    }

    //    public SecurityConfig(AuthFailHandler authFailHandler) { this.authFailHandler = authFailHandler; }

    @Bean
        public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
//        return NoOpPasswordEncoder.getInstance();       // test용
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtAccessDeniedHandler jwtAccessDeniedHandler, AuthService authService) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                        .accessDeniedHandler(jwtAccessDeniedHandler)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/auth/**",
                                "/auth/login",
                                "/auth/logout",
                                "/member/**",
                                "/member/update/**",
                                "/member/reset-password-request",
                                "/member/reset-password",
                                "/post/**",
                                "/post/viewCount/update/**",
                                "/mypage/**",
                                "/api/**",
                                "/sseudaimgs/**",
                                "/main.*.hot-update.js",
                                "/sockjs-node/**"
                        ).permitAll()
                                .anyRequest().authenticated()
                ).cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .addFilterBefore(new JwtFilter(tokenProvider, authService), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    /*CORS 설정용 Bean*/
    /*프론트에 React와 백엔드인 Spring Boot는 서로 localhost:3000, 8000 각각 다른 출처이기 때문에 브라우저가 보안정책에 의해 요청을 막아서
    * 프론트에 API를 설정했어도 요청이 받아오지 않는 오류 발생
    * 때문에 아래 설정으로 CORS 허용을 해야한다.*/
    //  SecurityFilterChain에도 적용해야한다.
    @Bean
    CorsConfigurationSource corsConfigurationSource(){

        //  CORS 관련 설정을 진행할 객체 생성
        CorsConfiguration configuration = new CorsConfiguration();

        //  허용할 도메인
        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:3000"
        ));

        //  허용할 메서드
        configuration.setAllowedMethods(Arrays.asList("GET", "PUT", "POST", "DELETE", "OPTIONS"));



        //  허용할 헤더
        configuration.setAllowedHeaders(
                Arrays.asList(
                        //  서버에서 응답할 때, 어떤 출처(origin)에서 요청을 허용할지를 결정하는 헤더
                        "Access-Control-Allow-Origin",
                        //  요청 또는 응답의 콘텐츠 유형(미디어 타입)
                        "Content-type",
                        //  CORS 요청을 통해 허용되는 HTTP 요청 헤더
                        "Access-Control-Allow-Headers",
                        //  클라이언트가 서버로 인증 정보를 보내기 위해 사용되는 헤더
                        "Authorization",
                        //  XMLHttpRequest로 요청이 이루어졌는지를 나타내기 위해 사용
                        "X-Requested-With"
                )
        );

        //  CORS 설정을 적용할 URL 패턴 설정
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}
