import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callUserPostsListApi } from '../../apis/PostAPICalls';
import MypagePost from '../../components/common/post/MypagePost';
import Button from '../../components/common/Global/Button.module.css';

function PostMypage() {

    const dispatch = useDispatch();
    const {username, postId} = useParams();

    console.log("마이페이지 게시글 전체 조회 시작");
    const myPostList = useSelector(state => state.postReducer);
    console.log("myPostList :", myPostList);

    useEffect(() => {
        dispatch(callUserPostsListApi({ username }));
    }, [dispatch, username]);

    useEffect(()=>{
      console.log(myPostList, "확인");
    },[myPostList]);

  return (
    <>
      <div style={{marginTop: '50px' ,position: 'relative'}}>
        <button className={Button.allPostBTN}>전체보기</button>
        <div>
          {Array.isArray(myPostList) && myPostList.map((post) =>(
            <MypagePost key={post.postId} post={post}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default PostMypage;