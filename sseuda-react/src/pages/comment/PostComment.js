import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callPostCommentListApi } from '../../apis/CommentAPICalls';
import Comment from '../../components/common/comment/Comment';

function PostComment() {

    const dispatch = useDispatch();
    const {postId} = useParams();

    console.log("게시글별 댓글 전체 조회");
    const commentList = useSelector(state => state.commentReducer);
    console.log("commentList: ", commentList);

    const fetchData =() =>{
        dispatch(callPostCommentListApi(postId));
    }

    useEffect(() =>{
        fetchData();
        console.log(commentList, "확인");
    }, [commentList]);
    
  return (
    <>
        <div>
            {Array.isArray(commentList) && commentList.map((comment) =>(
                <Comment key={comment.postId} comment={comment}/>
            ))}
        </div>
    </>
  )
}

export default PostComment;