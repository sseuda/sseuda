package com.sseuda.sseuda_server.jwt;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.io.IOException;

public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    public void handle(HttpServletRequest req, HttpServletResponse res,
                       AccessDeniedException e) throws IOException, ServletException {
        res.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
