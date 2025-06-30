import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PostMypage from '../post/PostMypage';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MypageCSS from './css/MyPage.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import { callUserPostsListApi } from '../../apis/PostAPICalls';
import LikesList from '../likes/LikesList';

function MyPage() {
  const dispatch = useDispatch();
  const { username } = useParams(); // ⬅ URL에서 받은 username
  const navigate = useNavigate();

  const isLogin = window.localStorage.getItem("accessToken");
  const decodedToken = isLogin ? decodeJwt(isLogin) : null;


  function isTokenExpired(decodedToken) {
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }

  useEffect(() => {
    if (!isLogin || !decodedToken || isTokenExpired(decodedToken)) {
        alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigate("/auth/login");
        return;
    }

    dispatch(callUserPostsListApi({ username }));
  }, [username, dispatch]);

  const userPageList = username => {
    navigate(`/post/${username}/posting`, {replace:false});
  }
  
  console.log("마이페이지 게시글 리스트 시작");


  return (
    <div className={MypageCSS.myPageBox}>
      <PostMypage/>
      <LikesList/>
      <div onClick={() => userPageList(username)} className={MypageCSS.textEditorBox}>
        <FontAwesomeIcon className={MypageCSS.penIcon} icon={faPen} />
      </div>
    </div>
  )
}

export default MyPage;