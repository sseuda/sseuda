import React from 'react';
import MyPage from '../pages/myPage/MyPage';
import TextEditor from '../components/common/post/TextEditor';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

function MypageLayout() {
  return (
    <div>
      <Header/>
      <main>
        {/* <TextEditor/> */}
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default MypageLayout;
