package com.sseuda.sseuda_server.function.member. repository;

import com.sseuda.sseuda_server.function.member.pojo.Login;

public interface MemberRepository {

    Login findByUsername(String username);
}
