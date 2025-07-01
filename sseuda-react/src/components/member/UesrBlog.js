import React from 'react'
import myUser from './css/UserInfo.module.css';
import global from '../common/Global/Button.module.css';

function UesrBlog() {

  return (
    <div className={myUser.infoBox}>
        <div className={myUser.infoTitle}>
            <h3 className={myUser.highlight}>MYBLOG</h3>
        </div>
        
        <div className={myUser.myBCard}>
            <div className={myUser.user_d}>
                <div className={myUser.d1}>
                    <div style={{width: '300px'}}>
                        <p>배경색 수정</p>
                    </div>
                    <button className={global.userBtn}>색깔선택</button>
                </div>
                <div className={myUser.d2}>
                    <p>글꼴 변경</p>
                </div>
                <div className={myUser.d3}>
                    <div>글 사이즈 변경</div>
                </div>
            </div>

            <button className={myUser.putBtn}>수정하기</button>
        </div>
    </div>
  )
}

export default UesrBlog;