import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { callPostsListApi } from '../../../apis/PostAPICalls';

function Post({
  post: {postId, postTitle, postContent, memberDTO}
}){

    const navigate = useNavigate();
    const onClickPostHandler = postId => {
      navigate(`/post/${postId}`, {replace:false});
    };

    // quill Api 사용 첫번째 이미지 추출 함수 
    const extractFirstImageSrc = (html) => {
        const match = html.match(/<img[^>]+src="([^">]+)"/);
        return match ? match[1] : null;
    };

    
    const firstImage = extractFirstImageSrc(postContent);

  return (
    <div onClick={() => onClickPostHandler(postId)}>
        <div>
            <div>
                  <div>
                      <div>
                          <p>
                              {memberDTO?.username}
                          </p>
                      </div>

                      <div>
                          <h2>{postTitle}</h2>
                          <p>{postContent}</p>
                      </div>
                  </div>
                  <div>
                      {firstImage && (
                          <img
                          src={firstImage}
                          alt="썸네일"
                          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', marginBottom: '10px' }}
                          />)}
                  </div>
              </div>
        </div>
    </div>
  )
}
export default Post;