import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostMypage from '../post/PostMypage';

function MyPage() {
  const dispatch = useDispatch();
  const {category, postId} = useParams();
  const navigate = useNavigate();

  console.log("마이페이지 게시글 리스트 시작");

  const userPageList = userCode =>{
    navigate(`/post/mypage/${userCode}`, {replace:false});
  }

  return (
    <div>
      마이페이지 입니다
      <div onClick={() => userPageList(1)}>userPage</div>
    </div>
  )
}

export default MyPage;