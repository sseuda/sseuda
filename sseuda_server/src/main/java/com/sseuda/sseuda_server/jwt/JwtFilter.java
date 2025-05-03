package com.sseuda.sseuda_server.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JwtFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtFilter.class);

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
}
