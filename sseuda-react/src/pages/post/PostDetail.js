import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callPostApi } from '../../apis/PostAPICalls';
import DetailPost from '../../components/common/post/DetailPost';

function PostDetail() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  console.log("게시글 상세 조회 시작");
  const postDetail = useSelector(state => state.postReducer);
  console.log("postDetail : ", postDetail);

  useEffect(() =>{
    dispatch(callPostApi({postId: params.postId}));
  },[params.postId]);

  return (
    <div>
      <div>
        {Array.isArray(postDetail) && postDetail.map((post) => (
          <DetailPost key={post.postId} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default PostDetail;