import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callUserPostsListApi } from '../../apis/PostAPICalls';
import MypagePost from '../../components/common/post/MypagePost';

function PostMypage() {

    const dispatch = useDispatch();
    const {userCode, postId} = useParams();

    console.log("마이페이지 게시글 전체 조회 시작");
    const myPostList = useSelector(state => state.postReducer);
    console.log("myPostList :", myPostList);

    useEffect(() => {
        dispatch(callUserPostsListApi({ userCode }));
    }, [dispatch, userCode]);

    useEffect(()=>{
      console.log(myPostList, "확인");
    },[myPostList]);

  return (
    <div>
      <div>
        {Array.isArray(myPostList) && myPostList.map((post) =>(
          <MypagePost key={post.postId} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default PostMypage;