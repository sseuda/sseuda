import React from 'react'
import Banner from './css/MainBanner.module.css';


function BannerPost({
    banner: { postDTO }
}) {

    // quill Api 사용 첫번째 이미지 추출 함수 
    const extractFirstImageSrc = (html) => {
        const match = html.match(/<img[^>]+src="([^">]+)"/);
        return match ? match[1] : null;
    };

    const firstImage = extractFirstImageSrc(postDTO?.postContent);

  return (
    <div className={Banner.BannerBox}>
        <div className={Banner.imgBox}>
            <div className={Banner.textBox}>
                <h2>{postDTO?.postTitle}</h2>
            </div>
            <div className={Banner.blurBox}/>
            <img src={firstImage} alt="배너 이미지" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
    </div>
    
  )
}

export default BannerPost;