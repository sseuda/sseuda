package com.sseuda.sseuda_server.function.likes.dao;

import com.sseuda.sseuda_server.function.likes.dto.LikesDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface LikesMapper {

    List<LikesDTO> findLikesList(int postId);

    List<LikesDTO> findLikes(int postId);

    List<LikesDTO> userLike(int userCode, int postId);

    List<LikesDTO> userLikesList(int userCode);

    List<LikesDTO> findBannerLikeList();

    int deleteLike(int postId, int userCode);

    int insertLike(Map<String, Object> likeMap);
}
