import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callPostApi } from '../../apis/PostAPICalls';

function PostDetail() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  console.log("게시글 상세 조회 시작");
  const postDetail = useSelector(state => state.postReducer);
  console.log("postDetail : ", postDetail);

  useEffect(() =>{
    dispatch(callPostApi(params.postId));
  },[params.postId]);

  // const fetchData=()=>{
  //   dispatch(callPostApi(params.postId));
  // }

  // useEffect(() => {
  //         fetchData();
  //     },[]);

  // const {postTitle, postContent, postCreateAt, viewCount, memberDTO} = postDetail;

const post = postDetail[0];

if(!post){
  return <p>게시글을 불러오는 중입니다...</p>;
}

  return (
    <div>
      <div>
        <div>
          <h1>{post.postTitle}</h1>
        </div>
        <div>
          <div>
            <p>{post.postCreateAt}</p>
            <p>{post.memberDTO?.username}</p>
          </div>
          <div>
            <p>{post.viewCount}</p>
          </div>
        </div>
        <div>
          {post.postContent}
        </div>
      </div>
    </div>
  )
}

export default PostDetail;