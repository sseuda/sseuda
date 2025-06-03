import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import MypageLayout from "./layouts/MypageLayout";
import Layout from "./layouts/Layout";
import PostLayout from "./layouts/PostLayout";
import PostDetail from "./pages/post/PostDetail";
import PostMypage from "./pages/post/PostMypage";
import MyPage from "./pages/myPage/MyPage";
import Login from "./pages/member/Login";
import Main from "./pages/Main";
import Signup from "./pages/member/Signup";
import FindUsername from "./pages/member/FindUsername";
import ResetPasswordRequest from "./pages/member/ResetPasswordRequest";
import ResetPassword from "./pages/member/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인페이지를 위한 Route */}
        <Route path="/" element={<Layout/>}>
          <Route index element={<Main />} />
          <Route path="auth/login" element={<Login/>}/>
          <Route path="member/signup" element={<Signup/>}/>
          <Route path="member/find-username" element={<FindUsername/>}/>
          <Route path="member/reset-password-request" element={<ResetPasswordRequest/>}/>
          <Route path="member/reset-password" element={<ResetPassword/>}/>
        </Route>

        {/* 마이페이지를 위한 Route */}
        <Route path="post/mypage" element={<MypageLayout/>}>
        <Route path=":userCode" element={<MyPage/>}/>
      
        </Route>

        {/* 게시글 관련 Route */}
        <Route path="post" element={<PostLayout/>}>
          <Route path=":postId" element={<PostDetail/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
