import React from 'react'
import { replace, useNavigate } from 'react-router-dom';
import Post from './css/MypagePost.module.css';

function MypagePost({
    post: {postId, postTitle, postContent, memberDTO, viewCount}
}) {

    const navigate = useNavigate();

    const onClickPostHandler = postId => {
        navigate(`/post/${postId}`, {replace:false});
    }

    // quill Api 사용 첫번째 이미지 추출 함수 
    const extractFirstImageSrc = (html) => {
        const match = html.match(/<img[^>]+src="([^">]+)"/);
        return match ? match[1] : null;
    };

    const firstImage = extractFirstImageSrc(postContent);
    console.log("이미지 :", firstImage);

  return (
    <>
        {firstImage && (
            <div className={Post.postBox} style={{ backgroundImage: `url(${firstImage})` }} onClick={() => onClickPostHandler(postId)}>
                <div className={Post.blurBox}>
                    <div className={Post.postTitle}>
                        <h4>{postTitle}</h4>
                    </div>
                    <div className={Post.viewCount}>
                        <p>{viewCount}</p>  
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default MypagePost;