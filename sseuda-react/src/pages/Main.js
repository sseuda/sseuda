import { Link } from "react-router-dom";
import PostMain from "./post/PostMain";

function Main() {

    
  return (
    <>
      <PostMain/>
      <Link to={"/mypage"}>마이페이지 바로가기</Link>
    </>
  )
}

export default Main;