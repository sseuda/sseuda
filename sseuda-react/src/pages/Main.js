import { Link, replace, useNavigate } from "react-router-dom";
import PostMain from "./post/PostMain";
import MainCSS from "./Main.module.css";
import PostBanner from "./post/PostBanner";

import { decodeJwt } from "../utils/tokenUtils";

function Main() {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const decoded = token ? decodeJwt(token) : null;
  const username = decoded ? decoded.sub : null;

  const userMyPageList = () => {
    if (username) {
      navigate(`/post/mypage/${username}`, {replace:false});
    } else {
      alert("로그인이 필요합니다.");
      navigate("/auth/login");
    }
  }


    
  return (
    <>
      <PostBanner/>
      <div className={MainCSS.mainBox}>
        <PostMain/>
        <div onClick={userMyPageList}>마이페이지 바로가기</div>
      </div>
    </>
  )
}

export default Main;