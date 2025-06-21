import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { callPostsListApi, callUpdateViewCountApi } from '../../../apis/PostAPICalls';
import MainPost from './css/MainPost.module.css';
import PostComment from '../../../pages/comment/PostComment';

function Post({
  post: {postId, postTitle, postContent, memberDTO}, index
}){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onClickPostHandler = async postId => {
      await dispatch(callUpdateViewCountApi({postId}));
      navigate(`/post/${postId}`, {replace:false});
    };
    console.log("postId???? ", postId);

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
    style={{ backgroundColor: bgColor }}>
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
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', marginBottom: '10px' }}
                    />)}
            </div>
        </div>
    </div>
  )
}
export default Post;