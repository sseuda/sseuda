import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { callLikeApi } from '../../../apis/LikesAPICalls';

function UserLikesList({postId}) {

    const dispatch = useDispatch();
    const likeCount = useSelector(state => state.likesReducer[postId]);
    const [count, setCount] = useState();

    useEffect(() =>{
      const fetchLikeCount = async() =>{
        const result = await dispatch(callLikeApi(postId));
        if(result){
          setCount(result);
        }
      };

      fetchLikeCount();
    }, [postId, dispatch]);
    
    return(
      <p style={{marginLeft: '8px'}}>
        {count}
      </p>
    )
}

export default UserLikesList;