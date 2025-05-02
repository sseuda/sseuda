package com.sseuda.sseuda_server.function.member.exception;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import java.io.IOException;
import java.net.URLEncoder;

@Configuration
public class AuthFailHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest req, HttpServletResponse res, AuthenticationException e)
            throws IOException, ServletException {

        String errorMessege = null;

        if (e instanceof BadCredentialsException) {
            errorMessege = "아이디가 존재하지 않거나 비밀번호가 일치하지 않습니다.";
        } else if (e instanceof UsernameNotFoundException) {
            errorMessege = "존재하지 않는 아이디입니다.";
        } else if (e instanceof InternalAuthenticationServiceException) {
            errorMessege = "서버에서 오류가 발생하였습니다. 다시 시도해 주세요.";
        } else if (e instanceof AuthenticationCredentialsNotFoundException) {
            errorMessege = "인증 요청이 거부되었습니다.";
        } else  {
            errorMessege = "알 수 없는 오류가 발생했습니다. 잠시 후에 시도해보세요.";
        }

        errorMessege = URLEncoder.encode(errorMessege, "UTF-8");

        setDefaultFailureUrl("auth/fail?massage=" + errorMessege);

        super.onAuthenticationFailure(req, res, e);
    }
}
