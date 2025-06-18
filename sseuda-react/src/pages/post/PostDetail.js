import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callPostApi } from '../../apis/PostAPICalls';
import Detail from './css/PostDetail.module.css';
import PostComment from '../comment/PostComment';
import ButtonCSS from '../../components/common/Global/Button.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import { callMemberApi } from '../../apis/MemberAPICalls';
import ReportPopup from '../report/ReportPopup';

function PostDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
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

  const postDetail = useSelector(state => state.postReducer);
  const post = postDetail[0];

  useEffect(() => {
    dispatch(callPostApi(params.postId));
  }, [params.postId]);

  // 신고 팝업 관련
  const [showReportPopup, setShowReportPopup] = useState(false);
  const handleReportClick = () => setShowReportPopup(true);
  const handleClosePopup = () => setShowReportPopup(false);

  if (!post) return <p>게시글을 불러오는 중입니다...</p>;

  return (
    <div>
      <div className={Detail.detailBox}>

        <button onClick={handleReportClick}>🚨신고하기</button>

        {showReportPopup && (
          <ReportPopup
          reporterId={loginUserId}
          reportedId={post.userId}
          postId={post.postId}
          // commentId={null}
          onClose={() => handleClosePopup(false)}
          />
        )}

        {/* 제목 */}
        <div className={Detail.titleBox}>
          <h1>{post.postTitle}</h1>
        </div>

        {/* 작성자, 날짜, 조회수 */}
        <div className={Detail.decBox}>
          <div className={Detail.userBox}>
            <p>{post.memberDTO?.userNickname}</p>
            <p>{post.postCreateAt}</p>
          </div>
          <div className={Detail.userView}>
            <button
              className={ButtonCSS.headerBTN}
              onClick={() => navigate(`/post/${post.memberDTO?.username}/update/${params.postId}`)}
            >
              수정하기
            </button>
            <p>{post.viewCount}</p>
          </div>
        </div>

        {/* 게시글 본문 */}
        <div className={Detail.contentBox} dangerouslySetInnerHTML={{ __html: post.postContent }} />
      </div>

      {/* 댓글 */}
      <PostComment />
    </div>
  );
}

export default PostDetail;