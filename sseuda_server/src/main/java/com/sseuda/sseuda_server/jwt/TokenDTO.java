package com.sseuda.sseuda_server.jwt;

public class TokenDTO {

    private String grantType;
    private String username;
    private String accessToken;
    private Long accessTokenExpiresIn; // 액세스 토큰 만료 시간

    public TokenDTO(String grantType, String memberName, String accessToken, Long accessTokenExpiresIn) {
        this.grantType = grantType;
        this.username = memberName;
        this.accessToken = accessToken;
        this.accessTokenExpiresIn = accessTokenExpiresIn;
    }

    // Getter와 Setter 추가 (Lombok을 사용할 수도 있음)
    public String getGrantType() {
        return grantType;
    }

    public void setGrantType(String grantType) {
        this.grantType = grantType;
    }

    public String getMemberName() {
        return username;
    }

    public void setMemberName(String memberName) {
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