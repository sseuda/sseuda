import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostMypage from '../post/PostMypage';
import PostTextEditor from '../post/PostTextEditor';

function MyPage() {
  const dispatch = useDispatch();
  const {category, postId} = useParams();
  
  console.log("마이페이지 게시글 리스트 시작");

  

  return (
    <div>
      <PostMypage/>
      <PostTextEditor/>
    </div>
  )
}

export default MyPage;