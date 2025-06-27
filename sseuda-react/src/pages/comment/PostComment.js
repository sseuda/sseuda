import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callPostCommentListApi } from '../../apis/CommentAPICalls';
import Comment from '../../components/common/comment/Comment';
import CommentCSS from './css/CommentPage.module.css';
import CommentInsert from '../../components/common/comment/CommentInsert';
import CommentUpdate from '../../components/common/comment/CommentUpdate';
import { decodeJwt } from '../../utils/tokenUtils';
import { callMemberApi } from '../../apis/MemberAPICalls';
import ReportPopup from '../report/ReportPopup';

function PostComment() {

    const dispatch = useDispatch();
    const {postId} = useParams();

    // 신고 팝업 관련
    const [showReportPopup, setShowReportPopup] = useState(false);
    const [reportTarget, setReportTarget] = useState(null);
    const handleReportClick = (commentId, userId) => {
        if (!loginUserId) {
        alert("로그인 후 신고가 가능합니다!");
        return;
        }
    
        setReportTarget({ commentId, userId });
        setShowReportPopup(true);
    };
    const handleClosePopup = () => setReportTarget(null);

    // console.log("게시글별 댓글 전체 조회");
    const commentList = useSelector(state => state.commentReducer);
    console.log("commentList: ", commentList);

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [deleteCommentId, setDeleteCommentId] = useState(null);

    const fetchData =() =>{
        dispatch(callPostCommentListApi(postId));
    }

    useEffect(() =>{
        fetchData();
    }, []);

    const accessToken = localStorage.getItem('accessToken');
    const decoded = accessToken ? decodeJwt(accessToken) : null;
    const [loginUserId, setLoginUserId] = useState(null);

    useEffect(() => {
        const fetchLoginUser = async () => {
            if (decoded?.sub) {
                try {
                    const response = await dispatch(callMemberApi(decoded.sub));
                    if (response) setLoginUserId(response.userId);
                } catch (error) {
                    console.error("로그인 유저 정보 가져오기 실패: ", error);
                }
            }
        };
        fetchLoginUser();
        }, [decoded, dispatch]);

    
    return (
    <>
        <div className={CommentCSS.commentBox} style={{marginBottom: '100px'}}>
            <div>

                {Array.isArray(commentList) && commentList.map((comment) =>(
                    <div key={comment.commentId}>
                        
                        {/* <div>
                        <button onClick={() => handleReportClick(comment.commentId, comment.memberDTO.userId)} className={CommentCSS.reportBTN}>🚨신고하기</button>
                        </div> */}

                            {reportTarget && reportTarget.commentId === comment.commentId && (
                                <ReportPopup
                                    reporterId={loginUserId}
                                    reportedId={comment.memberDTO.userId}
                                    postId={comment.postDTO.postId}
                                    commentId={comment.commentId}
                                    onClose={() => handleClosePopup(false)}
                                    />
                            )}

                        <Comment 
                        comment={comment}
                        onEdit={() => setEditingCommentId(comment.commentId)}
                        onCommentAdded={() =>{
                            setEditingCommentId(null);
                            fetchData();
                        }}
                        onReport={handleReportClick}/>

                    {editingCommentId === comment.commentId && (
                        <CommentUpdate
                        commentId={comment.commentId}
                        originalText={comment.commentText}
                        onCommentAdded={() =>{
                            setEditingCommentId(null);
                            fetchData();
                        }}
                        onCancel={() => setEditingCommentId(null)}
                        />
                    )}
            </div>
            ))}
            
                <CommentInsert postId={postId} onCommentAdded={fetchData} />
            
            </div>
                    
            
        </div>
    </>
    )
}

export default PostComment;