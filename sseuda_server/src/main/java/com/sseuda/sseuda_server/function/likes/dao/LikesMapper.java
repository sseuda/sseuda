package com.sseuda.sseuda_server.function.likes.dao;

import com.sseuda.sseuda_server.function.likes.dto.LikesDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LikesMapper {

    List<LikesDTO> findLikesList(int postId);

    List<LikesDTO> findLikes(int postId);

    List<LikesDTO> userLikesList(int userCode, int postId);

    List<LikesDTO> findBannerLikeList();

    int insertLike(int postId, int userCode, LikesDTO dto);

    int deleteLike(int postId, int userCode);
}
