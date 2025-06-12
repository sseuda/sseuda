import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { callPostApi } from '../../apis/PostAPICalls';
import BannerPost from '../../components/common/post/BannerPost';

import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';


function PostBanner() {

    const dispatch = useDispatch();
    
    console.log("메인페이지 배너 조회 시작");
    const bannerList = useSelector(state => state.postReducer);
    console.log("bannerList : ", bannerList);

    const fetchData = () => {
        dispatch(callPostApi)
    }

    useEffect(() => {
        fetchData();
    },[]);

    useEffect(() => {
        console.log(bannerList, "확인");
    }, [bannerList]);

  return (
    <div>
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            navigate={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
        >
            
            {Array.isArray(bannerList) && bannerList.map((banner) =>(
                <SwiperSlide>
                    <BannerPost banner={banner}/>
                </SwiperSlide>
            ))}
            
        </Swiper>
    </div>
  )
}

export default PostBanner;