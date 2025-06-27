import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { decodeJwt } from '../../../utils/tokenUtils';
import { callPostCommentUpdateApi } from '../../../apis/CommentAPICalls';
import CommentCSS from './css/Comment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';

function CommentUpdate({ commentId, originalText, onCommentAdded, onCancel }) {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const username = accessToken ? decodeJwt(accessToken).sub : null;

  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (originalText) setCommentText(originalText);
  }, [originalText]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("commentText", commentText);

    try {
      const result = await dispatch(callPostCommentUpdateApi({
        commentId,
        form: formData,
        username
      }));

      if (result?.status === 200) {
        alert("댓글이 수정되었습니다.");
        setCommentText('');
        onCommentAdded && onCommentAdded();
      } else {
        alert("댓글 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 수정 오류:", error);
      alert("댓글 수정에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={CommentCSS.commentForm}>
      <div className={CommentCSS.textareaWrapper}>
        <textarea
          className={CommentCSS.commentTextarea}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="댓글을 수정하세요"
          rows="2"
        />
        
        {/* 오른쪽 상단에 위치하는 취소 버튼 */}
        <button
          type="button"
          className={CommentCSS.cancelButton}
          title="수정 취소"
          onClick={onCancel}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {/* 오른쪽 하단에 위치하는 수정 버튼 */}
        <button
          type="submit"
          className={CommentCSS.submitButton}
          title="댓글 수정"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
    </form>
  );
}

export default CommentUpdate;