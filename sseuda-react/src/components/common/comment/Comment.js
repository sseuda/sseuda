import React, { useEffect } from 'react';
import CommentCSS from './css/Comment.module.css';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from '../../../utils/tokenUtils';
import CommentUpdate from './CommentUpdate';
import { useDispatch } from 'react-redux';
import { callPostCommentDeleteApi } from '../../../apis/CommentAPICalls';

function Comment({
    comment: {commentId, commentText, commentCreateAt, commentUpdateAt, commentDelete, postDTO, memberDTO},
    onEdit, onCommentAdded
}) {
    const dispatch = useDispatch();

    const accessToken = localStorage.getItem('accessToken');
    const decodedToken = accessToken ? decodeJwt(accessToken) : null;

    const isOwner = decodedToken?.sub === memberDTO?.username;

    console.log("memberDTO:", memberDTO);
    console.log(decodedToken?.sub);

    const commentDeleteHandler = async () => {
        const username = decodedToken?.sub;  // ✅ username 정의

        const result = await dispatch(callPostCommentDeleteApi({
        commentId,
        username
        }));

        if (result?.status === 200) {
        alert("댓글이 삭제되었습니다.");
        onCommentAdded && onCommentAdded();  // 댓글 목록 다시 불러오기
        } else {
        alert("댓글 삭제 실패");
        }

    }

  return (
    <>
        <div className={CommentCSS.userBox}>
            <div className={CommentCSS.nickBox}>
                <h4>
                    {memberDTO?.userNickname}
                </h4>
            </div>
            <div className={CommentCSS.textBox}>
                <p>
                    {commentText}
                </p>
            </div>
            <div className={CommentCSS.createAtBox}>
                <h5>
                    {commentCreateAt}
                </h5>
            </div>

            {isOwner && (
            <div>
                <div>
                    <button onClick={onEdit}>수정</button>
                </div>
                <div>
                    <button onClick={commentDeleteHandler}>삭제</button>
                </div>
            </div>
            )}
            
            
        </div>
    </>
  )
}

export default Comment;