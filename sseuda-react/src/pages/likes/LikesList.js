import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callUserLikeApi, callUserLikesListApi } from '../../apis/LikesAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import myUser from '../../components/member/css/UserInfo.module.css';
import Post from '../../components/common/post/css/MypagePost.module.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { callUpdateViewCountApi } from '../../apis/PostAPICalls';
import UserLikesList from '../../components/common/post/UserLikesList';
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function LikesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   const userLikes = useSelector(state => state.likesReducer.UserLikesList);
  const userLikes = useSelector(state => state.likesReducer.userLikes);

  const accessToken = localStorage.getItem('accessToken');
  const decodedToken = accessToken ? decodeJwt(accessToken) : null;
  const username = decodedToken ? decodedToken.sub : null;

  useEffect(() => {
    if (username) {
      dispatch(callUserLikesListApi(username));
    }
  }, [username]);

  console.log("userLikes??????????? ", userLikes);

  const onClickPostHandler = async (postId) => {
    try {
      await dispatch(callUpdateViewCountApi({ postId, username }));
    } catch (error) {
      console.warn("조회수 증가 실패:", error);
    } finally {
      navigate(`/post/${postId}`);
    }
  };

  // quill html에서 첫 번째 이미지 src 추출
  const extractFirstImageSrc = (html) => {
    const match = html.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
  };


  return (
    <div className={myUser.infoBox}>
      <div className={myUser.likeTitle} style={{marginBottom: '30px'}}>
        <div className={myUser.titleBox}>
          <h3 className={myUser.highlight}>LIKE</h3>
        </div>
      </div>

      <Swiper
  slidesPerView={3}
  spaceBetween={30}
  navigation={true}
  pagination={{ clickable: true }}
  mousewheel={true}
  keyboard={true}
  modules={[Navigation, Pagination, Mousewheel, Keyboard]}
  className="mySwiper"
>
  {userLikes && userLikes.map((like) => {
    const post = like.postDTO;
    if (!post) return null;

    const firstImage = extractFirstImageSrc(post.postContent);

    return (
      <SwiperSlide key={like.likesId} style={{ width: 'auto'}}>
        {firstImage && (
          <div
            className={Post.postBox}
            style={{ backgroundImage: `url(${firstImage})` }}
            onClick={() => onClickPostHandler(post.postId)}
          >
            <div className={Post.blurBox}>
              <div className={Post.postTitle}>
                <h4>{post.postTitle}</h4>
              </div>
              <div className={Post.icons}>
                <div className={Post.viewCount}>
                  <FontAwesomeIcon className={Post.viewIcon} icon={faEye} />
                  <p>{post.viewCount}</p>
                </div>
                <div className={Post.likeCount}>
                  <FontAwesomeIcon icon={faHeart} />
                  <UserLikesList postId={post.postId} />
                </div>
              </div>
            </div>
          </div>
        )}
      </SwiperSlide>
    );
  })}
</Swiper>
</div>
  );
}

export default LikesList;
