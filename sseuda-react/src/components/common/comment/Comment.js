import React, { useEffect } from 'react';
import CommentCSS from './css/Comment.module.css';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from '../../../utils/tokenUtils';
import CommentUpdate from './CommentUpdate';
import { useDispatch } from 'react-redux';
import { callPostCommentDeleteApi } from '../../../apis/CommentAPICalls';
import useLoginInfo from '../../../hooks/useLoginInfo';

function Comment({
    comment: {commentId, commentText, commentCreateAt, commentUpdateAt, commentDelete, postDTO, memberDTO},
    onEdit, onCommentAdded, onReport
}) {
    const dispatch = useDispatch();

    const accessToken = localStorage.getItem('accessToken');
    const decodedToken = accessToken ? decodeJwt(accessToken) : null;

	const loginUserId = useLoginInfo().loginUserId;
	console.log("로그인한 사람 아이디? ", loginUserId);
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
        <div className={CommentCSS.commentContainer}>
			{/* 상단: 닉네임 + 신고버튼 + 작성일 */}
			<div className={CommentCSS.header}>
				<div className={CommentCSS.leftHeader}>
					<span className={CommentCSS.nickname}>{memberDTO?.userNickname}</span>
					{loginUserId !== memberDTO?.userId &&
					(<button
						className={CommentCSS.reportBtn}
						onClick={() => onReport?.(commentId, memberDTO?.userId)}
					>
						🚨신고
					</button>)}
				</div>
				<span className={CommentCSS.createdAt}>{commentCreateAt}</span>
			</div>

			{/* 본문: 댓글 + 수정/삭제 */}
			<div className={CommentCSS.bodyRow}>
				<div className={CommentCSS.content}>{commentText}</div>

				{isOwner && (
					<div className={CommentCSS.buttonGroup}>
						<button className={CommentCSS.editBtn} onClick={onEdit}>
							수정
						</button>
						<button className={CommentCSS.deleteBtn} onClick={commentDeleteHandler}>
							삭제
						</button>
					</div>
				)}
			</div>
		</div>
    )
}

export default Comment;