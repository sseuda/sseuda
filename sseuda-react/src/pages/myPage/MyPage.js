import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostMypage from '../post/PostMypage';
import PostTextEditor from '../post/PostTextEditor';
import { faL, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MypageCSS from './css/MyPage.module.css';

function MyPage() {
  const dispatch = useDispatch();
  const {category, postId} = useParams();
  const navigate = useNavigate();

  const userPageList = userCode => {
    navigate(`/post/mypage/${userCode}/postoing`, {replace:false});
  }
  
  console.log("마이페이지 게시글 리스트 시작");


  return (
    <div style={{width: '100hv', position: 'relative', backgroundColor: 'blue'}}>
      <PostMypage/>
      <div onClick={() => userPageList(1)} className={MypageCSS.textEditorBox}>
        <FontAwesomeIcon className={MypageCSS.penIcon} icon={faPen} />
        {/* <PostTextEditor/> */}
      </div>

    </div>
  )
}

export default MyPage;