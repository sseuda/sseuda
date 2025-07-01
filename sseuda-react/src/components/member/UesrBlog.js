import React from 'react'
import myUser from './css/UserInfo.module.css';
import global from '../common/Global/Button.module.css';
import { useDispatch } from 'react-redux';
import { setBgColor } from '../../modules/userSlice';

function UesrBlog() {

    const dispatch = useDispatch();

    const handleColorChange = () => {
        const color = prompt('원하는 색상 코드를 입력하세요 (예: #FF0000 또는 red)');

        if (color) {
        dispatch(setBgColor(color));
        }
  };

  return (
    <div className={myUser.infoBox}>
      <div className={myUser.infoTitle}>
        <h3 className={myUser.highlight}>MYBLOG</h3>
      </div>

      <div className={myUser.myBCard}>
        <div className={myUser.user_d}>
          <div className={myUser.d1}>
            <div style={{ width: '300px' }}>
              <p>배경 색 수정</p>
            </div>
            <button className={global.userBtn} onClick={handleColorChange}>
              컬러 선택
            </button>
          </div>

          <div className={myUser.d1}>
            <div style={{ width: '300px' }}>
              <p>마이페이지 바 수정</p>
            </div>
            <button className={global.userBtn} onClick={handleColorChange}>
              컬러 선택
            </button>
          </div>

          <div className={myUser.d1}>
            <div style={{ width: '300px' }}>
              <p>버튼 색 수정</p>
            </div>
            <button className={global.userBtn} onClick={handleColorChange}>
              컬러 선택
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UesrBlog;