package com.sseuda.sseuda_server.function.likes.service;

import com.sseuda.sseuda_server.function.likes.dao.LikesMapper;
import com.sseuda.sseuda_server.function.likes.dto.LikesDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LikesService {

    private LikesMapper likesMapper;

    @Autowired
    public LikesService(LikesMapper likesMapper) {
        this.likesMapper = likesMapper;
    }

    public List<LikesDTO> findLikesList(int postId) {

        return likesMapper.findLikesList(postId);
    }

    public List<LikesDTO> findLikes(int postId) {

        return likesMapper.findLikes(postId);
    }

    public List<LikesDTO> userLike(int userCode, int postId) {

        return likesMapper.userLike(userCode, postId);
    }

    public List<LikesDTO> userLikesList(int userCode) {

        return likesMapper.userLikesList(userCode);
    }

    //    배너 조회
    public List<LikesDTO> findBannerLikeList(){

        return likesMapper.findBannerLikeList();
    }

    @Transactional
    public int insertLike(int postId, int userCode, LikesDTO dto) {

        return likesMapper.insertLike(postId, userCode, dto);
    }

    @Transactional
    public int deleteLike(int postId, int userCode) {

        return likesMapper.deleteLike(postId, userCode);
    }



}
