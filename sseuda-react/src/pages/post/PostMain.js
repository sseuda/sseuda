import React, { useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callPostsListApi } from '../../apis/PostAPICalls';
import MainPost from '../../components/common/post/MainPost';


function PostMain() {
  const dispatch = useDispatch();
    const {postId} = useParams();

    console.log("메인페이지 게시글 전체 조회 시작");
    const postList = useSelector(state => state.postReducer);
    console.log("postList : ", postList);

    const fetchData=() =>{
        dispatch(callPostsListApi(postId))
    }

    useEffect(() => {
        fetchData();
    },[]);

    // useEffect(()=>{
    //     fetchData();
    // },[category]);

    useEffect(()=>{
        // console.log('category :', category);
        console.log(postList, "확인");
    },[postList]);

    
  return (
    <div>
        <div>
            {Array.isArray(postList) && postList.map((post) => (
                <MainPost key={post.postId} post={post}/>
            ))}
        </div>
        <Link to={"/mypage"}>마이페이지 바로가기</Link>
    </div>
  )

}

export default PostMain;

    