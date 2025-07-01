import { Link, useNavigate } from "react-router-dom";
import PostMain from "./post/PostMain";
import MainCSS from "./Main.module.css";
import PostBanner from "./post/PostBanner";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { decodeJwt } from "../utils/tokenUtils";
import { useEffect, useState } from "react";
import Alarm from "./alarm/Alarm";

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

  // 알람 모달창 
  const [showAlarm, setShowAlarm] = useState(false);

  const [weather, setWeather] = useState(null);
  
    useEffect(() => {
      const fetchWeather = async () => {
        try {
          const API_KEY = '59f40285acee7464751c365ea4cd8cfc';
          const city = 'Seoul';
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
          const data = await response.json();
          setWeather(data);
        } catch (error) {
          console.error('날씨 불러오기 실패:', error);
        }
      };
  
      fetchWeather();
    }, []);
  
    if (!weather) return <div>날씨 정보를 불러오는 중...</div>;

    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
  
    
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

<div className={MainCSS.rightContainer}>
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
          <button onClick={() => setShowAlarm(true)}>🔔 알림</button>
          <p><b>쓰다</b>에 일상을 기록해보세요 😊</p>
          <div onClick={userMyPageList} className={MainCSS.myBlogBTN}>
            내블로그 바로가기
          </div>
      </div>
        )}
        </div>
        
      {/* 날씨 */}
        <div className={MainCSS.waetherBox}>
        <h3> 현재 날씨 (서울)</h3>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt="날씨 아이콘"
          className={MainCSS.weatherIcon}
        />
        <p> {weather.main.temp}°C</p>
        <p> {weather.weather[0].description}</p>
      </div>

    </div>


  </div>
  {/* 알람 모달 팝업 */}
  {showAlarm && <Alarm onClose={() => setShowAlarm(false)} />}
      
</div>

  )
}

export default Main;