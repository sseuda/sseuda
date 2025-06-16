import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callPostApi } from '../../apis/PostAPICalls';
import Detail from './css/PostDetail.module.css';
import PostComment from '../comment/PostComment';
import ButtonCSS from '../../components/common/Global/Button.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import { callAddReportApi } from '../../apis/ReportsAPICalls';
import Comment from '../../components/common/comment/Comment';
import { callMemberApi } from '../../apis/MemberAPICalls';

function PostDetail() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const username = accessToken ? decodeJwt(accessToken).sub : null;
  const decoded = accessToken ? decodeJwt(accessToken) : null;
  const [loginUserId, setLoginUserId] = useState(null);

  useEffect(() => {
    const fetchLoginUser = async () => {
      if (decoded && decoded.sub) {
        try {
          const response = await dispatch(callMemberApi(decoded.sub));  // ✅ dispatch 사용
          console.log("로그인 유저 정보: ", response);
          if (response) {
            setLoginUserId(response.userId);
          }
        } catch (error) {
          console.error("로그인 유저 정보 가져오기 실패: ", error);
        }
      }
    };
    fetchLoginUser();
  }, [decoded, dispatch]);

  console.log('디코디드? ', decoded)
  console.log('유저넴: ', loginUserId);

  // console.log("게시글 상세 조회 시작");
  const postDetail = useSelector(state => state.postReducer);
  console.log("postDetail : ", postDetail);

  useEffect(() =>{
    dispatch(callPostApi(params.postId));
  },[params.postId]);

  // const fetchData=()=>{
  //   dispatch(callPostApi(params.postId));
  // }

  // useEffect(() => {
  //         fetchData();
  //     },[]);

  // const {postTitle, postContent, postCreateAt, viewCount, memberDTO} = postDetail;

const post = postDetail[0];

// 신고관련
const [showReportPopup, setShowReportPopup] = useState(false);
const [reasonCode, setReasonCode] = useState('');
const [reasonDetail, setReasonDetail] = useState('');

const handleReportClick = () => {
  setShowReportPopup(true);
}

const handleClosePopup = () => {
  setShowReportPopup(false);
};

const handleReportSubmit = () => {
  const form = {
    reporterId: loginUserId,
    reportedId: post.userId,
    postId: post.postId,
    commentId: null,
    reasonCode,
    reasonDetail,
  };

  console.log('내가 작성한 신고 폼: ', form);

  dispatch(callAddReportApi(form));
  alert('신고가 접수되었습니다.');
  setShowReportPopup(false);
};

if(!post){
  return <p>게시글을 불러오는 중입니다...</p>;
}

return (
  <div>
    <div className={Detail.detailBox}>

      {/* 🚨 신고하기 버튼 */}
      <button onClick={handleReportClick}>🚨신고하기</button>

      {/* 🚨 신고 팝업 */}
      {showReportPopup && (
        <div className={Detail.popupOverlay}>
          <div className={Detail.popupBox}>
            <h3>게시글 신고</h3>
            <label>신고 사유</label>
            <select value={reasonCode} onChange={(e) => setReasonCode(e.target.value)}>
              <option value="" disabled hidden>신고 사유 선택</option>
              <option value="ABUSE">욕설/비방</option>
              <option value="SPAM">도배/광고</option>
              <option value="FALSE_INFO">허위정보</option>
              <option value="PRIVACY">개인정보 노출</option>
              <option value="HARASSMENT">괴롭힘/따돌림</option>
              <option value="HATE">혐오/차별</option>
              <option value="ETC">기타</option>
            </select>
            <textarea placeholder="신고 상세 내용을 입력해주세요" 
            value={reasonDetail}
            onChange={(e) => setReasonDetail(e.target.value)}/>
            <div className={Detail.popupButtons}>
              <button onClick={handleClosePopup}>취소</button>
              <button onClick={handleReportSubmit}>신고 제출</button>
            </div>
          </div>
        </div>
      )}

      {/* 제목 영역 */}
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

    {/* 댓글 컴포넌트 */}
    <PostComment />
  </div>
);
}

export default PostDetail;