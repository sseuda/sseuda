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
        <div className={MainCSS.loginBox}>
          <p><b>쓰다</b>에 로그인하여 더 많은 기능을 이용해보세요 :-)</p>
          <Link to="/auth/login" className={MainCSS.loginBTN}><img src="/images/main/sseudaKorean.png" className={MainCSS.logo}/>로그인</Link>
          <div className="bottom-links">
					<Link to="/member/find-username">아이디 찾기</Link>
					<span>|</span>
					<Link to="/member/reset-password-request">비밀번호 찾기</Link>
					<span>|</span>
					<Link to="/member/signup">회원가입</Link>
          </div>
          <div onClick={userMyPageList}>마이페이지 바로가기</div>
        </div>
      </div>
    </>
  )
}

export default Main;