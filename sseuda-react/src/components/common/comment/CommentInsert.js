import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeJwt } from '../../../utils/tokenUtils';
import { callPostCommentRegistApi } from '../../../apis/CommentAPICalls';

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

  const formData = new FormData();
  formData.append("commentText", commentText);

  try {
    const actionResult = await dispatch(callPostCommentRegistApi({
      postId,
      form: formData,
      username
    }));

    console.log('📦 등록 결과:', actionResult);  // 여기를 꼭 확인!

    // 여기가 핵심! 응답 결과 검사
    if (actionResult?.status === 200) {
      alert("댓글이 등록되었습니다!");
      setCommentText('');
      onCommentAdded && onCommentAdded(); // 새로고침 트리거
    } else {
      alert("댓글 등록에 실패했습니다. [서버 응답 오류]");
    }
  } catch (error) {
    console.error("댓글 등록 중 예외 발생:", error);
    alert("댓글 등록에 실패했습니다. [예외]");
  }
};
    
    

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="댓글을 입력하세요"
        rows="3"
        style={{ width: '100%', padding: '10px' }}
      />
      <button type="submit" style={{ marginTop: '10px' }}>댓글 등록</button>
    </form>
  );
}

export default CommentInsert;
