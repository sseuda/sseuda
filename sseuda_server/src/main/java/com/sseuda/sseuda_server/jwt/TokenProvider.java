package com.sseuda.sseuda_server.jwt;

import com.sseuda.sseuda_server.function.member.pojo.Login;
import com.sseuda.sseuda_server.security.CustomUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TokenProvider {

    private final Key key;
    private final UserDetailsService userDetailsService;

    // 토큰 유효기간 (1시간)
    private static final long TOKEN_EXPIRE_TIME = 1000 * 60 * 60;

    // 생성자: key 생성
    public TokenProvider(UserDetailsService userDetailsService, @Value("${jwt.secret}") String secretKey) {
        this.userDetailsService = userDetailsService;
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // ✅ 1. 토큰 생성
//    public TokenDTO generateTokenDTO(Member member) {
//        long now = System.currentTimeMillis();
//        Date expiration = new Date(now + TOKEN_EXPIRE_TIME);
//
//        String token = Jwts.builder()
//                .setSubject(member.getUsername())
//                .claim("auth", getAuthorities(member))
//                .setExpiration(expiration)
//                .signWith(key, SignatureAlgorithm.HS512)
//                .compact();
//
//        return new TokenDTO("Bearer", member.getUsername(), token, expiration.getTime());
//    }
    public String createToken(Authentication authentication) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Login login = userDetails.getMember();
//        long now = System.currentTimeMillis();
//        Date expiration = new Date(now + TOKEN_EXPIRE_TIME);
//
//        return Jwts.builder()
//                .setSubject(member.getUsername())
//                .claim("auth", getAuthorities(member))
//                .setExpiration(expiration)
//                .signWith(key, SignatureAlgorithm.HS512)
//                .compact();
        return createToken(login);
    }

    public String createToken(Login login) {
        long now = System.currentTimeMillis();
        Date expiration = new Date(now + TOKEN_EXPIRE_TIME);

        return Jwts.builder()
                .setSubject(login.getUsername())
                .claim("auth", getAuthorities(login))
                .setExpiration(expiration)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    // ✅ 2. 토큰으로 사용자 아이디 꺼내기
    public String getUserId(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // ✅ 3. 토큰으로 Authentication 만들기
    public Authentication getAuthentication(String token) {
        Claims claims = parseClaims(token);
        String userId = claims.getSubject();
        List<SimpleGrantedAuthority> authorities = getAuthoritiesFromClaim(claims.get("auth"));

        UserDetails userDetails = userDetailsService.loadUserByUsername(userId);

        return new UsernamePasswordAuthenticationToken(userDetails, "", authorities);
    }

    // ✅ 4. 토큰 유효성 검사
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            // 유효하지 않으면 false 또는 예외 던짐
            return false;
        }
    }

    // ✅ 5. 클레임 추출
    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ✅ 6. 권한 리스트 만들기 (문자열 리스트 → 객체로)
    private List<SimpleGrantedAuthority> getAuthoritiesFromClaim(Object authClaim) {
        return Arrays.stream(authClaim.toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }


    private static String getAuthorities(Login login) {
        return login.getRole().getRole(); // "USER", "ADMIN", "SUPER"
    }

    public long getTokenRemainingTime(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getExpiration().getTime() - System.currentTimeMillis();
        } catch (Exception e) {
            return 0;
        }
    }
}

