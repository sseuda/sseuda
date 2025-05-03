package com.sseuda.sseuda_server.member. repository;

import com.sseuda.sseuda_server.member.pojo.Login;

public interface MemberRepository {

    Login findByUsername(String username);
}
