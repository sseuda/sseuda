import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { useNavigate, useParams } from 'react-router-dom';
import { callPostMemberApi } from '../../apis/PostAPICalls';

function MyInformation() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    dispatch(callPostMemberApi(username));
},[username, dispatch]);


  return (
    <>
    </>
  )
}

export default MyInformation;