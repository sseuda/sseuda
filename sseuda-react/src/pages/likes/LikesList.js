import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { callUserLikesListApi } from '../../apis/LikesAPICalls';

function LikesList({username, postId}) {

    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(callUserLikesListApi({username, postId}));
    })
  return (
    <>

    </>
  )
}

export default LikesList;