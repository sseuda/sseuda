package com.sseuda.sseuda_server.member.controller;

import com.sseuda.sseuda_server.jwt.TokenDTO;
import com.sseuda.sseuda_server.jwt.TokenProvider;
import com.sseuda.sseuda_server.member.dto.LoginDTO;
import com.sseuda.sseuda_server.member.dto.JwtResponse;
import com.sseuda.sseuda_server.member.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
}