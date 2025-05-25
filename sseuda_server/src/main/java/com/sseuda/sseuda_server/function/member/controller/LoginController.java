package com.sseuda.sseuda_server.function.member.controller;

import com.sseuda.sseuda_server.function.member.dto.LoginDTO;
import com.sseuda.sseuda_server.function.member.service.AuthService;
import com.sseuda.sseuda_server.jwt.TokenDTO;
import com.sseuda.sseuda_server.jwt.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final AuthService authService;

    public LoginController(AuthenticationManager authenticationManager, TokenProvider tokenProvider, AuthService authService) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody LoginDTO loginDTO) {
//        UsernamePasswordAuthenticationToken authToken =
//                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());
//
//        Authentication authentication = authenticationManager.authenticate(authToken);
//
//        String jwt = tokenProvider.createToken(authentication);
        TokenDTO tokenDTO = authService.login(loginDTO);
        return ResponseEntity.ok(tokenDTO);
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        String token = extractToken(request);

        if (token == null || token.isEmpty()) {
            return ResponseEntity.badRequest().body("유효하지 않은 토큰입니다.");
        }

        authService.blacklistToken(token);
        return ResponseEntity.ok("로그아웃 완료");
    }

    private String extractToken(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer ")) {
            return bearer.substring(7);
        }
        return null;
    }


}