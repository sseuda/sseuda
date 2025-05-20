import React from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function MyPage() {
  const dispatch = useDispatch();
  const {category, postId} = useParams();

  console.log("마이페이지 게시글 리스트 시작");

  return (
    <div>
      마이페이지입니다~~
    </div>
  )
}

export default MyPage;