import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callUserPostsListApi } from '../../apis/PostAPICalls';
import MypagePost from '../../components/common/post/MypagePost';
import Button from '../../components/common/Global/Button.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import './styles.css';
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

function PostMypage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {username, postId} = useParams();

    console.log("마이페이지 게시글 전체 조회 시작");
    const myPostList = useSelector(state => state.postReducer);
    console.log("myPostList :", myPostList);

    useEffect(() => {
        dispatch(callUserPostsListApi({ username }));
    }, [dispatch, username]);

    useEffect(()=>{
      console.log(myPostList, "확인");
    },[myPostList]);

     // 예: myPostList가 배열이고, 각 post 객체에 smallCategoryId가 있다고 가정
  // 전체보기 버튼에서 첫 번째 게시글의 smallCategoryId를 사용한다고 가정해봄
  const firstSmallCategoryId = myPostList && myPostList.length > 0 
    ? myPostList[0].smallCategoryId 
    : null;

  const onClickUserPageListHandler = (username, smallCategoryId) =>{
    if(!smallCategoryId){
      alert("카테고리 정보가 없습니다.");
      return;
    }
    // navigate(`/post/mypage/${username}/${smallCategoryId}`);
    navigate(`/post/mypage/${username}/1`);
  }

  return (
    <>
    {Array.isArray(myPostList) && myPostList.length > 0 ? (
        <div style={{marginTop: '50px', position: 'relative'}}>
          <button 
            style={{position: 'absolute', top: '0px', right: '0', zIndex: '10'}}
            className={Button.allPostBTN} 
            onClick={() => onClickUserPageListHandler(username, firstSmallCategoryId)}
            >
            전체보기
          </button>
          <Swiper 
          slidesPerView={3}
          spaceBetween={30}
          // cssMode={true}
          navigation={true}
          pagination={{
          clickable: true,
          }}
          mousewheel={true}
          // keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
          style={{display: 'flex', flexWrap: 'nowrap', overflow: 'hidden'}}>
            {myPostList.map((post) => (
              <SwiperSlide>
                <MypagePost key={post.postId} post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
    </>
  )
}

export default PostMypage;