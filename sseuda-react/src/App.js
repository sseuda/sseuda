import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import MypageLayout from "./layouts/MypageLayout";
import Layout from "./layouts/Layout";
import PostLayout from "./layouts/PostLayout";
import PostDetail from "./pages/post/PostDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인페이지를 위한 Route */}
        <Route path="/" element={<Layout/>}>
        
        </Route>

        {/* 마이페이지를 위한 Route */}
        <Route path="/mypage" element={<MypageLayout/>}>

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
