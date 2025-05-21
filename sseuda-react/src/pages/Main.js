import { Link } from "react-router-dom";
import PostMain from "./post/PostMain";
import MainCSS from "./Main.module.css";

function Main() {

    
  return (
    <>
      <div className={MainCSS.mainBox}>
        <PostMain/>
        <Link to={"/mypage"}>마이페이지 바로가기</Link>
      </div>
    </>
  )
}

export default Main;