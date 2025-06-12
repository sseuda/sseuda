import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callUserCategoryPostsListApi } from '../../apis/PostAPICalls';
import MypagePost from '../../components/common/post/MypagePost';

function UserPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {username, smallCategoryId: paramSmallCategoryId} = useParams();

    // smallCategoryId가 없으면 기본값 '1'로 설정
    const smallCategoryId = paramSmallCategoryId || '1';

    console.log("회원별 게시글 카테고리 조회 시작");
    const userList = useSelector(state => state.postReducer);
    console.log("userList : ", userList);

    useEffect(() => {
        dispatch(callUserCategoryPostsListApi({username, smallCategoryId}));
    }, [dispatch, username, smallCategoryId])


  return (
    <div>
        {Array.isArray(userList) && userList.map((post) =>(
            <MypagePost key={post.postId} post={post}/>
        ))}
    </div>
  )
}

export default UserPage;