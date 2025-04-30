package com.sseuda.sseuda_server.jwt;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint{

    public void commence(HttpServletRequest req, HttpServletResponse res,
                         AuthenticationException authException) throws IOException, ServletException {
        res.sendError(HttpServletResponse.SC_FORBIDDEN);
    }
}
