import { Link, useNavigate } from "react-router-dom";
import PostMain from "./post/PostMain";
import MainCSS from "./Main.module.css";
import PostBanner from "./post/PostBanner";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { decodeJwt } from "../utils/tokenUtils";
import { useState } from "react";

function Main() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const accessToken = localStorage.getItem('accessToken');
	const decodedToken = accessToken ? decodeJwt(accessToken) : null;

	const isTokenExpired = (accessToken) => {
		if (!decodedToken) return true;
		const currentTime = Math.floor(Date.now() / 1000);
		return decodedToken.exp < currentTime;
	};

  const isLogin = accessToken && decodedToken && !isTokenExpired(decodedToken);
  const username = isLogin ? decodedToken.sub : null;

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      alert("검색어를 입력해주세요.");
      return;
    }
    navigate(`/post/search?keyword=${encodeURIComponent(searchTerm)}`);
  };

  const userMyPageList = () => {
    if (username) {
      navigate(`/mypage/${username}`, {replace:false});
    } else {
      alert("로그인이 필요합니다.");
      navigate("/auth/login");
    }
  }


    
  return (
    <div>
  {/* 검색창 */}
  <div className={MainCSS.searchBox}>
    <div className={MainCSS.searchWrapper}>
      <input
        type="text"
        className={MainCSS.searchInput}
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button className={MainCSS.searchBtn} onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={MainCSS.searchIcon} />
      </button>
    </div>
  </div>

  {/* 배너 */}
  <PostBanner />

  {/* 메인 콘텐츠 */}
  <div className={MainCSS.mainBox}>
    <PostMain />

    {/* 로그인 박스 */}
    <div className={MainCSS.loginBox}>
      {!isLogin ? (
        <div className={MainCSS.login}>
          <p><b>쓰다</b>에 로그인하여 더 많은 기능을 이용해보세요 😊</p>
          <Link to="/auth/login" className={MainCSS.loginBTN}>
            <img src="/images/main/sseudaKorean.png" className={MainCSS.logo} />
            로그인
          </Link>
          <div className="bottom-links">
            <Link to="/member/find-username">아이디 찾기</Link>
            <span>|</span>
            <Link to="/member/reset-password-request">비밀번호 찾기</Link>
            <span>|</span>
            <Link to="/member/signup">회원가입</Link>
          </div>
        </div>
      ) : (
        <div className={MainCSS.myBlog}>
          <p><b>쓰다</b>에 일상을 기록해보세요 😊</p>
          <div onClick={userMyPageList} className={MainCSS.myBlogBTN}>
            내블로그 바로가기
          </div>
        </div>
      )}
    </div>
  </div>
</div>
  )
}

export default Main;