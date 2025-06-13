import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callPostApi } from '../../apis/PostAPICalls';
import Detail from './css/PostDetail.module.css';
import PostComment from '../comment/PostComment';

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
    <>
      <div className={Detail.detailBox}>
        <div className={Detail.titleBox}>
          <h1>{post.postTitle}</h1>
        </div>
        <div className={Detail.decBox}>
          <div className={Detail.userBox}>
            <p>{post.memberDTO?.userNickname}</p>
            <p>{post.postCreateAt}</p>
          </div>
          <div className={Detail.userView}>
            <p>{post.viewCount}</p>
          </div>
        </div>
        <div className={Detail.contentBox} dangerouslySetInnerHTML={{ __html: post.postContent }}/>
      </div>
      <PostComment/>
    </>
  )
}

export default PostDetail;