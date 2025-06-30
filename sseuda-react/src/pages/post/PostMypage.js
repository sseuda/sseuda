import React, { useEffect, useState } from 'react'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import MainCSS from "../Main.module.css";
import "../post/css/SwiperSlide.css";


function PostMypage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {username} = useParams();
    // console.log("마이페이지 게시글 전체 조회 시작");
    const myPostList = useSelector(state => state.postReducer);
    // console.log("myPostList :", myPostList);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(callUserPostsListApi({ username }));
    }, [dispatch, username]);

    // useEffect(()=>{
    //   console.log(myPostList, "확인");
    // },[myPostList]);

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
    
    navigate(`/post/mypage/${username}/${smallCategoryId}`);
  }

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }

    navigate(`/mypage/${username}/search?keyword=${encodeURIComponent(searchTerm)}`);
  };

  const wrapper ={
    marginTop: '-50px'
  };

  return (
    <>
    {Array.isArray(myPostList) && myPostList.length > 0 ? (
      <div>
          <div style={{marginTop: '50px', display: 'flex', justifyContent: "space-between"}}>
            {/* 검색창 */}
            <div>
              <div className={MainCSS.searchWrapper}>
                <input
                  type="text"
                  className={MainCSS.searchInput}
                  placeholder="검색어를 입력하세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button className={MainCSS.searchBtn} onClick={handleSearch}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} className={MainCSS.searchIcon} />
                </button>
              </div>
            </div>
            
            <div>
              <button 
              style={{marginTop: '15px', zIndex: '10'}}
              className={Button.allPostBTN} 
              onClick={() => onClickUserPageListHandler(username, firstSmallCategoryId)}
              >
                전체보기
              </button>
            </div>
          </div>

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
              <SwiperSlide key={post.postId}>
                <MypagePost post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
      
    </>
  )
}

export default PostMypage;