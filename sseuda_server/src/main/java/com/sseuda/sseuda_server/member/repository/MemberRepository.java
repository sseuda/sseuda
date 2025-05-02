package com.sseuda.sseuda_server.member. repository;

import com.sseuda.sseuda_server.member.pojo.Member;

public interface MemberRepository {

    Member findByUsername(String username);
}
