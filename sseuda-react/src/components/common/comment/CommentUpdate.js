import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { decodeJwt } from '../../../utils/tokenUtils';
import { callPostCommentUpdateApi } from '../../../apis/CommentAPICalls';

function CommentUpdate({commentId, onCommentAdded}) {

    const dispatch = useDispatch();

    const accessToken = window.localStorage.getItem("accessToken");
    const username = accessToken ? decodeJwt(accessToken).sub : null;

    const [commentText, setCommentText] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("commentText", commentText);

        try{
            const actionResult = await dispatch(callPostCommentUpdateApi({
                commentId,
                form: formData,
                username
            }));

            console.log("수정 결과: ", actionResult);

            if(actionResult?.status === 200){
                alert("댓글이 수정되었습니다.");
                setCommentText('');
                onCommentAdded && onCommentAdded();
            }else{
                alert("댓글 수정에 실패했습니다. [서버 응답 오류]");
            }
        }catch(error){
            console.error("댓글 수정 중 예외 발생: ", error);
            alert("댓글 수정에 실패했습니다. [예외]");
        }
    };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="댓글을 입력하세요"
        rows="1"
        style={{ width: '100%', padding: '10px' }}
      />
      <button type="submit" style={{ marginTop: '10px' }}>댓글 수정</button>
    </form>
  )
}

export default CommentUpdate;