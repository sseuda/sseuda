import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인페이지 경로 */}
        <Route path="/" element={<Layout/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
