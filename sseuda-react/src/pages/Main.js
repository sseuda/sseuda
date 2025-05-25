import { Link, useNavigate } from "react-router-dom";
import PostMain from "./post/PostMain";
import MainCSS from "./Main.module.css";

function Main() {
  const navigate = useNavigate();

  const userPageList = userCode =>{
    navigate(`/post/mypage/${userCode}`, {replace:false});
  }
    
  return (
    <>
      <div className={MainCSS.mainBox}>
        <PostMain/>
        <div onClick={() => userPageList(1)}>마이페이지 바로가기</div>
      </div>
    </>
  )
}

export default Main;