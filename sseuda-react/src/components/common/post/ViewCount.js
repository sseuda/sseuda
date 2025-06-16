import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { callUpdateViewCountApi } from '../../../apis/PostAPICalls';

function ViewCount({
    post: {postId}
}) {

    const dispatch = useDispatch();
    
    useEffect( postId =>{
        dispatch(callUpdateViewCountApi(postId));
    }, [postId]);

}

export default ViewCount;