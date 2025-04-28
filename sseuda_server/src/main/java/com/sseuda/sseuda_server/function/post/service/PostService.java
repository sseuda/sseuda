package com.sseuda.sseuda_server.function.post.service;

import com.sseuda.sseuda_server.function.post.controller.PostController;
import com.sseuda.sseuda_server.function.post.dao.PostMapper;
import com.sseuda.sseuda_server.function.post.dto.PostDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private static final Logger log = LoggerFactory.getLogger(PostController.class);
    private final PostMapper postMapper;

    @Autowired
    public PostService(PostMapper postMapper) {
        this.postMapper = postMapper;
    }

    public List<PostDTO> findPostList(){

        return postMapper.findPostList();
    }
}
