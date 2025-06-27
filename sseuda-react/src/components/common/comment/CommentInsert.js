import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeJwt } from '../../../utils/tokenUtils';
import { callPostCommentRegistApi } from '../../../apis/CommentAPICalls';
import CommentCSS from './css/Comment.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function CommentInsert({ postId, onCommentAdded }) {
  const dispatch = useDispatch();

  const accessToken = window.localStorage.getItem("accessToken");
  const username = accessToken ? decodeJwt(accessToken).sub : null;

  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!commentText.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }
  
    // JSON 객체로 작성
    const form = {
      commentText: commentText,
      commentCreateAt: new Date().toISOString() // 서버에서 LocalDateTime 받을 경우 필요
    };
  
    try {
      const actionResult = await dispatch(callPostCommentRegistApi({
        postId,
        form,
        username
      }));
  
      console.log('📦 등록 결과:', actionResult);
  
      if (actionResult?.status === 200) {
        alert("댓글이 등록되었습니다!");
        setCommentText('');
        onCommentAdded && onCommentAdded();
      } else {
        alert("댓글 등록에 실패했습니다. [서버 응답 오류]");
      }
    } catch (error) {
      console.error("댓글 등록 중 예외 발생:", error);
      alert("댓글 등록에 실패했습니다. [예외]");
    }
  };
    
    

  return (
    <div className={CommentCSS.commentInsertLine}>
    <form onSubmit={handleSubmit} className={CommentCSS.commentForm}>
      <div className={CommentCSS.textareaWrapper}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="댓글을 입력하세요..."
          rows="4"
          className={CommentCSS.commentTextarea}
        />
        <button type="submit" className={CommentCSS.submitButton} title="댓글 등록">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </form>
    </div>
  );
}

export default CommentInsert;
