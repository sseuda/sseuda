import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import { callMemberApi } from '../../apis/MemberAPICalls';
import myUser from './css/UserInfo.module.css';
import global from '../common/Global/Button.module.css';

function UserInfo() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.memberReducer);
    console.log("userInfo: ", userInfo);

    const accessToken = localStorage.getItem('accessToken');
    const decodedToken = accessToken ? decodeJwt(accessToken) : null;
    const username = decodedToken ? decodedToken.sub : null;

    useEffect(() =>{
        dispatch(callMemberApi(username));
    },[dispatch]);

  return (
    <div className={myUser.infoBox}>
        <div className={myUser.infoTitle}>
            <div className={myUser.titleBox}>
                <h3 className={myUser.highlight}>PROFILE</h3>
            </div>
            <button className={global.allPostBTN}>수정하기</button>
        </div>
        
        <div className={myUser.infoCard}>
            <div className={myUser.user_a}>
                <div className={myUser.a1}>
                    <div>
                        <p>{userInfo?.userFullname}</p>
                    </div>
                    <div>
                        <p>{userInfo?.userStatus}</p>
                    </div>
                </div>
                <div className={myUser.a2}>
                    <p>{userInfo?.enrollDate}</p>
                </div>
                <div className={myUser.a3}>{userInfo?.userPhone}</div>
            </div>

            <div className={myUser.user_b}>
                <div className={myUser.b1}>
                    <p>{userInfo?.userNickname}</p>
                </div>
                <div className={myUser.b2}>
                    <p>비밀번호</p>
                </div>
                
            </div>
            
            <div className={myUser.user_c}>
                <div className={myUser.c1}>
                    <div>
                        <p>우편번호</p>
                    </div>
                    <button>주소검색</button>
                </div>
                <div className={myUser.c2}>
                    <p>기본주소</p>
                </div>
                <div className={myUser.c3}>
                    <p>나머지 주소</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserInfo;