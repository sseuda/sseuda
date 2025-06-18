import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { useNavigate, useParams } from 'react-router-dom';
import { callPostMemberApi } from '../../apis/PostAPICalls';
import { callMemberApi, callMemberByIdApi } from '../../apis/MemberAPICalls';

function MyInformation() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.memberReducer);
    console.log("userInfo?? : ", userInfo);
    // const {username} = useParams();

    const accessToken = localStorage.getItem('accessToken');
    const decodedToken = accessToken ? decodeJwt(accessToken) : null;
    const username = decodedToken ? decodedToken.sub : null;

    function isTokenExpired(decodedToken) {
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp < currentTime;
    }

    useEffect(() => {
    if (!accessToken || !decodedToken || isTokenExpired(decodedToken)) {
        alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigate("/auth/login");
        return;
    }

    dispatch(callMemberApi(username));
},[username, dispatch]);


  return (
    
    <>
        <div>
            <div>
                <div>
                    <h3>Profile</h3>
                </div>
                <div>
                    <button>수정하기</button>
                </div>
            </div>
            
            <div>
                <div>
                    <div>
                        <div>
                            <p>{userInfo?.userFullname}</p>
                        </div>
                        <div>
                            <p>{userInfo?.userStatus}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default MyInformation;