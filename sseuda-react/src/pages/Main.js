import React, { useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callPostsListApi } from '../apis/PostAPICalls';
import MainPost from '../components/common/post/MainPost';

function Main() {

    const dispatch = useDispatch();
    const {category, postId} = useParams();

    console.log("메인페이지 게시글 전체 조회 시작");
    const postList = useSelector(state => state.postReducer);
    console.log("postList : ", postList);

    const fetchData=() =>{
        dispatch(callPostsListApi(category, postId))
    }

    useEffect(() => {
        fetchData();
    },[]);

    // useEffect(()=>{
    //     fetchData();
    // },[category]);

    useEffect(()=>{
        console.log('category :', category);
        console.log(postList, "확인");
    },[postList]);

  return (
    <div>
        <div>
            {Array.isArray(postList) && postList.map((post) =>(
                <div key={post.postId} style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '8px'
                    }}>
                        <h3>{post.postTitle}</h3>
                        <p>{post.postContent}</p>
                        <small>작성일: {post.postCreateAt}</small>
                    </div>
            ))}
        </div>
        <Link to={"/mypage"}>마이페이지 바로가기</Link>
    </div>
  )
}

export default Main;