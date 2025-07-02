import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { callUpdateViewCountApi } from '../../../apis/PostAPICalls';
import MainPost from './css/MainPost.module.css';
import { decodeJwt } from '../../../utils/tokenUtils';

function Post({
  post: {postId, postTitle, postContent, memberDTO}, index
}){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const decoded = accessToken ? decodeJwt(accessToken) : null;
    const username = decoded?.sub;  // 또는 decoded?.username 등

    const onClickPostHandler = async (postId) => {
    try {
        await dispatch(callUpdateViewCountApi({ postId, username }));
    } catch (error) {
        console.warn("조회수 증가 실패 (작성자 본인일 수 있음):", error);
        // 실패하더라도 페이지 이동은 시도
    } finally {
        navigate(`/post/${postId}`, { replace: false });
    }
};

    // console.log("postId???? ", postId);

    // quill Api 사용 첫번째 이미지 추출 함수 
    const extractFirstImageSrc = (html) => {
        const match = html.match(/<img[^>]+src="([^">]+)"/);
        return match ? match[1] : null;
    };

    
    const firstImage = extractFirstImageSrc(postContent);

    // 배경색
    const backgroundColors = ['#F5C3A4', '#FCEF9F', '#A9CDD7'];
    const bgColor = backgroundColors[index % backgroundColors.length];

    const removeImageTags = (html) => {
  return html.replace(/<img[^>]*>/gi, '');
};

  return (
    <div 
    className={MainPost.postBox} 
    onClick={() => onClickPostHandler(postId)}
    style={{ backgroundColor: bgColor, borderRadius: '15px'}}>
        <div className={MainPost.box}>
            <div className={MainPost.textBox}>
                <div className={MainPost.userBox}>
                    <p>
                        {memberDTO?.userNickname}
                    </p>
                </div>

                <div className={MainPost.contentBox}>
                    <h2>{postTitle}</h2>
                      <div dangerouslySetInnerHTML={{ __html: removeImageTags(postContent) }} />
                </div>
            </div>
            <div className={MainPost.imgBox}>
                {firstImage && (
                    <img
                    src={firstImage}
                    alt="썸네일"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', marginBottom: '10px' }}
                    />)}
            </div>
        </div>
    </div>
  )
}
export default Post;