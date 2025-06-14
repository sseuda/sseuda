import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callPostCommentListApi } from '../../apis/CommentAPICalls';
import Comment from '../../components/common/comment/Comment';
import CommentCSS from './css/CommentPage.module.css';
import CommentInsert from '../../components/common/comment/CommentInsert';

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
    }, []);
    
  return (
    <>
        <div className={CommentCSS.commentBox} style={{marginBottom: '100px'}}>
            <div>
                {Array.isArray(commentList) && commentList.map((comment) =>(
                    <Comment key={comment.commentId} comment={comment}/>
                ))}
            </div>
            <div>
                <CommentInsert postId={postId} onCommentAdded={fetchData} />

            </div>
            
        </div>
    </>
  )
}

export default PostComment;