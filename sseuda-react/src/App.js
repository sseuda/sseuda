import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import MypageLayout from "./layouts/MypageLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인페이지를 위한 Route */}
        {/* <Route path="/" element={<Layout/>}></Route> */}
        <Route path="/mypage" element={<MypageLayout/>}>
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
