import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import MypageNavbar from '../components/common/MypageNavbar';
import { useSelector } from 'react-redux';

function MypageLayout() {

  const bgColor = useSelector((state) => state.user.bgColor);
    

  return (
    <div 
    style={{ position: 'relative' }}>
      <Header/>
      <div style={{
        display: 'flex', 
        height: '93vh',
        backgroundColor: bgColor
        }}>
        <MypageNavbar style={{position: 'absolute', top: '0', left: '0'}}/>
        <div style={{width: '1280px', margin: '0 auto'}}>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default MypageLayout;
