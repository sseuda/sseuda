import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from '../../../utils/tokenUtils';
import { callUpdateViewCountApi } from '../../../apis/PostAPICalls';
import Post from '../../common/post/css/MypagePost.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import UserLikesList from '../post/UserLikesList';

function LikesPost({post}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!post) {
    return null;
  }

  const { postId, postTitle, postContent, viewCount } = post;

  const accessToken = localStorage.getItem('accessToken');
  const decoded = accessToken ? decodeJwt(accessToken) : null;
  const username = decoded?.sub;

  const onClickPostHandler = async () => {
    try {
      await dispatch(callUpdateViewCountApi({ postId, username }));
    } catch (error) {
      console.warn("조회수 증가 실패:", error);
    } finally {
      navigate(`/post/${postId}`, { replace: false });
    }
  };

  const extractFirstImageSrc = (html) => {
    if (!html) return null;
    const match = html.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
  };

  const firstImage = extractFirstImageSrc(postContent);

  return (
    <div
      style={{ width: '100%' }}
      onClick={onClickPostHandler}
    >
      {firstImage && (
        <div
          className={Post.postBox}
          style={{ backgroundImage: `url(${firstImage})` }}
        >
          <div className={Post.blurBox}>
            <div className={Post.postTitle}>
              <h4>{postTitle}</h4>
            </div>
            <div className={Post.icons}>
              <div className={Post.viewCount}>
                <FontAwesomeIcon className={Post.viewIcon} icon={faEye} />
                <p>{viewCount}</p>
              </div>
              <div className={Post.likeCount}>
                <FontAwesomeIcon icon={faHeart} />
                <UserLikesList postId={postId} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LikesPost;
