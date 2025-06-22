package com.sseuda.sseuda_server.function.post.dao;

import com.sseuda.sseuda_server.function.post.dto.PostDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Mapper
public interface PostMapper {

//    게시글 전체 조회
    List<PostDTO> findPostList();

//    배너 조회
    List<PostDTO> findBannerPostList();

//    게시글 상세 조회
    List<PostDTO> findPost(int postId);

//    카테고리별 게시글 전체 조회
    List<PostDTO> findCategoryPostList(int bigCategoryId, int smallCategoryId);

//    회원별 게시글 전체 조회
    List<PostDTO> findUserPostList(int userCode);

//    회원별 카테고리 게시글 전체 조회
    List<PostDTO> findUserCategoryPostList(int userCode, int smallCategoryId);

//    검색용
    List<PostDTO> searchPosts(@Param("keywords") String[] keywords);

//    회원별 게시글 등록
    int saveUserPosting(@Param("dto") PostDTO dto, int userCode);

//    회원별 게시글 수정
    int updateUserPosting(Map<String, Object> map);

//    회원별 게시글 삭제
    int deleteUserPosting(Map<String, Object> map);

//    게시글별 조회수 증가
    int viewCountUpdate(PostDTO dto, int postId);

//    viewCount만 가지고오기
    int findViewCount(@Param("postId") int postId);
}
