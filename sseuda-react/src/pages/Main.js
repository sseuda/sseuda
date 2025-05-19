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

    // quill Api 사용 첫번째 이미지 추출 함수 
    const extractFirstImageSrc = (html) => {
        const match = html.match(/<img[^>]+src="([^">]+)"/);
        return match ? match[1] : null;
    };

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
            {Array.isArray(postList) && postList.map((post) =>{
                const firstImage = extractFirstImageSrc(post.postContent);
                return(
<div key={post.postId}>
                    <div>
                        <div>
                            <p>
                                {post.memberDTO?.username}
                            </p>
                        </div>

                        <div>
                            <h2>{post.postTitle}</h2>
                            <p>{post.postContent}</p>
                        </div>
                    </div>
                    <div>
                        {firstImage && (
                            <img
                            src={firstImage}
                            alt="썸네일"
                            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', marginBottom: '10px' }}
                            />)}
                    </div>
                </div>
                )
                
            })}
        </div>
        <Link to={"/mypage"}>마이페이지 바로가기</Link>
    </div>
  )
}

export default Main;