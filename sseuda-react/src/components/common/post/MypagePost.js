import React from 'react'
import { replace, useNavigate } from 'react-router-dom';
import Post from './css/MypagePost.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { callUpdateViewCountApi } from '../../../apis/PostAPICalls';
import { decodeJwt } from '../../../utils/tokenUtils';


function MypagePost({
    post: {postId, postTitle, postContent, memberDTO, viewCount}
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

      const accessToken = localStorage.getItem('accessToken');
      const decoded = accessToken ? decodeJwt(accessToken) : null;
      const username = decoded?.sub; 

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

    // quill Api 사용 첫번째 이미지 추출 함수 
    const extractFirstImageSrc = (html) => {
        const match = html.match(/<img[^>]+src="([^">]+)"/);
        return match ? match[1] : null;
    };

    const firstImage = extractFirstImageSrc(postContent);
    // console.log("이미지 :", firstImage);

  return (
    <div style={{width: '100%'}}>
        {firstImage && (
            <div className={Post.postBox} style={{ backgroundImage: `url(${firstImage})` }} onClick={() => onClickPostHandler(postId)}>
                <div className={Post.blurBox}>
                    <div className={Post.postTitle}>
                        <h4>{postTitle}</h4>
                    </div>
                    <div className={Post.viewCount}>
                        <FontAwesomeIcon className={Post.viewIcon} icon={faEye} />
                        <p>{viewCount}</p>  
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default MypagePost;