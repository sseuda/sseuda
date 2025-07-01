import { BrowserRouter, Route, Routes } from "react-router-dom";
import MypageLayout from "./layouts/MypageLayout";
import Layout from "./layouts/Layout";
import PostLayout from "./layouts/PostLayout";
import PostDetail from "./pages/post/PostDetail";
import MyPage from "./pages/myPage/MyPage";
import Login from "./pages/member/Login";
import Main from "./pages/Main";
import Signup from "./pages/member/Signup";
import FindUsername from "./pages/member/FindUsername";
import ResetPasswordRequest from "./pages/member/ResetPasswordRequest";
import ResetPassword from "./pages/member/ResetPassword";
import PostTextEditor from "./pages/post/PostTextEditor";
import UserPage from "./pages/post/UserPage";
import PostSearchResult from "./pages/post/PostSearchResult";
import AdminMembers from "./pages/admin/AdminMembers";
import AdminPageLayout from "./layouts/AdminPageLayout";
import AdminReports from "./pages/admin/AdminReports";
import TextEditorUpdate from "./components/common/post/TextEditorUpdate";
import MyInformation from "./pages/myPage/MyInformation";
import AdminRoute from "./components/common/auth/AdminRoute";
import SuperRoute from "./components/common/auth/SuperRoute";
import Alarm from "./pages/alarm/Alarm";
import PostUserSearch from "./pages/post/PostUserSearch";
import AdminCategory from "./pages/admin/AdminCategory";
import SuperAdminPage from "./pages/admin/SuperAdminPage";

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
          <Route path="post/search" element={<PostSearchResult/>} />
          <Route element={<Alarm/>}/>
        </Route>

        {/* 관리자 페이지를 위한 Route */}
        <Route path="admin" element={<AdminRoute />}>
          <Route element={<AdminPageLayout />}>
            <Route path="members" element={<AdminMembers />} />
            <Route path="reports" element={<AdminReports />} />
          </Route>
        </Route>

        <Route path="admin/super" element={<SuperRoute />}>
          <Route element={<AdminPageLayout />}>
            <Route index element={<SuperAdminPage />} />
              <Route path="category" element={<AdminCategory/>}/>
          </Route>
        </Route>

        {/* 마이페이지를 위한 Route */}
        <Route path="mypage" element={<MypageLayout/>}>
          <Route path=":username" element={<MyPage/>}/>
          <Route path="member/:username" element={<MyInformation/>}/>
          <Route path=":username/search" element={<PostUserSearch/>}/>
        </Route>

        {/* 게시글 관련 Route */}
        <Route path="post" element={<PostLayout/>}>
          <Route path=":postId" element={<PostDetail/>}/>
          <Route path=":username/update/:postId" element={<TextEditorUpdate/>}/>
          <Route path=":username/posting" element={<PostTextEditor/>}/>
          <Route path="mypage/:username/:smallCategoryId" element={<UserPage/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
