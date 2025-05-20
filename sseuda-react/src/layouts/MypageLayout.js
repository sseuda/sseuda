import React from 'react';
import MyPage from '../pages/myPage/MyPage';
import TextEditor from '../components/common/post/TextEditor';

function MypageLayout() {
  return (
    <>
        <main>
            <MyPage/>
            <TextEditor/>
        </main>
    </>
  )
}

export default MypageLayout;
