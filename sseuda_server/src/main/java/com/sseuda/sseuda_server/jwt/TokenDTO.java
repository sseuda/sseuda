package com.sseuda.sseuda_server.jwt;

public class TokenDTO {

    private String grantType;       // 토큰 타입
    private String username;        // 사용자아이디
    private String accessToken;     // 엑세스 토큰
    private Long accessTokenExpiresIn; // 액세스 토큰 만료 시간

    // 기본 생성자
    public TokenDTO() {
    }

    public TokenDTO(String grantType, String username, String accessToken, Long accessTokenExpiresIn) {
        this.grantType = grantType;
        this.username = username;
        this.accessToken = accessToken;
        this.accessTokenExpiresIn = accessTokenExpiresIn;
    }

    public TokenDTO(String token) {
    }

    public String getGrantType() {
        return grantType;
    }

    public void setGrantType(String grantType) {
        this.grantType = grantType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Long getAccessTokenExpiresIn() {
        return accessTokenExpiresIn;
    }

    public void setAccessTokenExpiresIn(Long accessTokenExpiresIn) {
        this.accessTokenExpiresIn = accessTokenExpiresIn;
    }
}