import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callPostsListApi } from '../../apis/PostAPICalls';
import MainPost from '../../components/common/post/MainPost';
import pagiNation from '../../components/common/Global/Pagination.module.css';

function PostMain() {
  const dispatch = useDispatch();
    const {postId} = useParams();

    // console.log("메인페이지 게시글 전체 조회 시작");
    const postList = useSelector(state => state.postReducer);
    // console.log("postList : ", postList);

    const [posts, setPosts] = useState([]);

    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;

    // 현재 페이지에 표시할 게시글 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 번호 버튼 생성
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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
        // console.log(postList, "확인");
        if(Array.isArray(postList)){
          setPosts(postList)
        }
    },[postList]);

    
    return (
    <div>
      <div style={{minHeight: '1000px', position: 'relative'}}>
        {Array.isArray(currentPosts) && currentPosts.map((post, index) => (
          <div key={post.postId}>
            <MainPost post={post} index={index}/>
          </div>
        ))}

            <div 
            className={pagiNation.pagination}
            style={{position: 'absolute', bottom: '50px', left: '200px'}}>
            {pageNumbers.map(number => (
              <button key={number} onClick={() => setCurrentPage(number)}>
                {number}
              </button>
            ))}
          </div>
        </div>
    </div>
  )

}

export default PostMain;

    