import React from 'react';
import MyPage from '../pages/myPage/MyPage';
import TextEditor from '../components/common/post/TextEditor';
import { Outlet } from 'react-router-dom';

function MypageLayout() {
  return (
    <>
        <Outlet>
            <MyPage/>
            {/* <TextEditor/> */}
        </Outlet>
    </>
  )
}

export default MypageLayout;
