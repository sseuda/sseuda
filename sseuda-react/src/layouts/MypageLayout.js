import React from 'react';
import MyPage from '../pages/myPage/MyPage';
import TextEditor from '../components/common/post/TextEditor';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MypageNavbar from '../components/common/MypageNavbar';

function MypageLayout() {
  return (
    <div style={{position: 'relative'}}>
      <Header/>
      <div style={{display: 'flex'}}>
        <MypageNavbar style={{position: 'absolute', top: '0', left: '0'}}/>
        {/* <TextEditor/> */}
        <Outlet/>
      </div>
    </div>
  )
}

export default MypageLayout;
