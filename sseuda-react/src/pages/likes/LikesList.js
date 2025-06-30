import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { callUserLikesListApi } from '../../apis/LikesAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import myUser from '../../components/member/css/UserInfo.module.css';
import LikesFolder from '../../components/common/likes/LikesFolder';

function LikesList() {
    const dispatch = useDispatch();
    const userLikes = useSelector(state => state.likesReducer);
    console.log("userLikes?? ", userLikes);

    const accessToken = localStorage.getItem('accessToken');
    const decodedToken = accessToken ? decodeJwt(accessToken) : null;
    const username = decodedToken ? decodedToken.sub : null;
    
    useEffect(() =>{
        dispatch(callUserLikesListApi(username));
    }, [dispatch]);
        

  return (
    <div className={myUser.infoBox}>
        <div className={myUser.infoTitle}>
            <div className={myUser.titleBox}>
                <h3 className={myUser.highlight}>LIKE</h3>
            </div>
        </div>

        <div>
            <LikesFolder/>
        </div>
    </div>
  )
}

export default LikesList;