import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callLikeInsertApi, callPostDeleteApi, callUserLikeApi } from '../../apis/LikesAPICalls';
import { callMemberApi } from '../../apis/MemberAPICalls';
import { callAdminPostApi, callDeletePostsApi, callPostApi } from '../../apis/PostAPICalls';
import ButtonCSS from '../../components/common/Global/Button.module.css';
import LikesSave from '../../components/common/likes/LikesSave';
import { decodeJwt } from '../../utils/tokenUtils';
import PostComment from '../comment/PostComment';
import ReportPopup from '../report/ReportPopup';
import Detail from './css/PostDetail.module.css';

import 'quill/dist/quill.snow.css';

function PostDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const decoded = accessToken ? decodeJwt(accessToken) : null;
  const username = decoded?.sub;

  const [loginUserId, setLoginUserId] = useState(null);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [userLikeList, setUserLikeList] = useState([]);

  const postDetail = useSelector(state => state.postReducer);
  const post = postDetail[0];
  console.log("postDetail data: ", postDetail);

  const [loginUserAuth, setLoginUserAuth] = useState(null);

  // 관리자 권한 체크 (SUPER 포함)
  const isAdmin = Array.isArray(loginUserAuth)
    ? loginUserAuth.includes('ROLE_ADMIN') || loginUserAuth.includes('SUPER')
    : loginUserAuth === 'ROLE_ADMIN' || loginUserAuth === 'SUPER';

  console.log("decoded.auth: ", decoded?.auth);

  const handleAdminClick = async () => {
    if (!isAdmin) {
      alert('관리자만 사용할 수 있습니다.');
      return;
    }

    try {
      const result = await dispatch(callAdminPostApi({ postId: post.postId }));

      if (result.status === 200) {
        alert('게시글이 관리자 권한으로 숨김 처리되었습니다.');
        navigate(`/post/admin/${post.postId}`);
      } else {
        alert('게시글 숨김 처리에 실패했습니다.');
      }
    } catch (e) {
      console.error('관리자 삭제 실패: ', e);
      alert('에러가 발생했습니다.');
    }
  };

  // 게시글 내용 가져오기
  useEffect(() => {
    if (!params.postId) return;

    dispatch(callPostApi(params.postId));
  }, [params.postId, dispatch]);

  // 삭제된 게시글일 경우 경고창 + 리디렉트
  useEffect(() => {
  if (post?.postDelete === 'Y') {
    const isWriter = loginUserId === post.userId;

    const isAdmin =
      loginUserAuth === 'SUPER' || loginUserAuth === 'ROLE_ADMIN' ||
      (Array.isArray(loginUserAuth) && (
        loginUserAuth.includes('SUPER') || loginUserAuth.includes('ROLE_ADMIN')
      ));

    if (isWriter || isAdmin) {
      // 작성자 또는 관리자면 관리자 상세 페이지로 이동
      navigate(`/post/admin/${params.postId}`);
    } else {
      // 그 외 유저는 접근 차단
      alert("이 게시글은 삭제된 상태입니다.");
      navigate('/');
    }
  }
}, [post, loginUserId, loginUserAuth, navigate, params.postId]);


  // 날짜 포맷 
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
  
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
  
    const ampm = hour >= 12 ? '오후' : '오전';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedMinute = minute.toString().padStart(2, '0');
  
    return `${year}년 ${month}월 ${day}일, ${ampm} ${formattedHour}시 ${formattedMinute}분`;
  };

  // 로그인 유저 정보 가져오기
  useEffect(() => {
    const fetchLoginUser = async () => {
      if (!accessToken || !decoded?.sub) return;

      try {
        const response = await dispatch(callMemberApi(decoded.sub));
        if (response) {
          setLoginUserId(response.userId);
          setLoginUserAuth(decoded?.auth);
        }
      } catch (error) {
        console.error("로그인 유저 정보 가져오기 실패: ", error);
      }
    };

    fetchLoginUser();
  }, [accessToken, decoded, dispatch]);

  // 좋아요 상태 가져오기
  useEffect(() => {
    const fetchUserLikeStatus = async () => {
      if (!username || !params.postId) return;

      try {
        const result = await dispatch(callUserLikeApi(username, params.postId));

        if (result && result.data) {
          const liked = result.data.some(likePost => likePost.postId == params.postId);
          setIsClick(liked);
        }
      } catch (error) {
        console.error('좋아요 상태 불러오기 실패:', error);
      }
    };

    fetchUserLikeStatus();
  }, [username, params.postId, dispatch]);

  // 신고 팝업 관련
  const handleReportClick = () => {
    if (!loginUserId) {
      alert("로그인 후 신고가 가능합니다!");
      return;
    }
    setShowReportPopup(true);
  };

  const handleClosePopup = () => setShowReportPopup(false);

  // 게시글 삭제
  const onClickDeleteHandler = (postId) => {
    try {
      dispatch(callDeletePostsApi({ postId, username }));
      alert("게시글이 삭제되었습니다.");
      navigate('/');
    } catch (e) {
      console.warn("삭제 실패: ", e);
      alert("삭제 실패되었습니다.");
    }
  };

  // 좋아요 클릭 핸들러
  const handleLikeClick = async () => {
    if (!loginUserId) {
      alert("로그인 후 좋아요 가능합니다!");
      return;
    }

    try {
      if (!isClick) {
        const form = new FormData();
        form.append('userId', loginUserId);
        form.append('postId', post.postId);

        await dispatch(callLikeInsertApi({
          postId: post.postId,
          form: form,
          username: username
        }));

        setIsClick(true);
      } else {
        await dispatch(callPostDeleteApi({
          postId: post.postId,
          username: username
        }));

        setIsClick(false);
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      alert('좋아요 처리 중 문제가 발생했습니다.');
    }
  };

  if (!post) return <p>게시글을 불러오는 중입니다...</p>;

  return (
    <div>
      <div className={Detail.detailBox}>

        {loginUserId !== post.userId && (
          <button onClick={handleReportClick} className={Detail.reportBtn}>🚨신고하기</button>
        )}

        {isAdmin && (
          <button onClick={handleAdminClick} className={Detail.reportBtn}>
            🔒 관리자 권한으로 삭제
          </button>
        )}

        {showReportPopup && (
          <ReportPopup
            reporterId={loginUserId}
            reportedId={post.userId}
            postId={post.postId}
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
            <p>{formatDateTime(post.postCreateAt)}</p>
          </div>

          <div className={Detail.userLive}>
            {post.userId !== loginUserId && (
              <div className={Detail.userLike}>
                <button
                  onClick={handleLikeClick}
                  style={{
                    backgroundColor: '#fff',
                    color: isClick ? '#F5C3A4' : '#757575'
                  }}
                >
                  <LikesSave
                    postId={params.postId}
                    icon={faHeart}
                    style={{ fontSize: '20px' }}
                  />
                </button>
              </div>
            )}

            <div className={Detail.userView}>
              <p>{post.viewCount}</p>
            </div>
          </div>

        </div>

        {/* 게시글 본문 */}
        <div className={Detail.contentBox} dangerouslySetInnerHTML={{ __html: post.postContent }} />

        {/* 수정/삭제 버튼 */}
        {post.userId === loginUserId && (
          <div>
            <button
              className={ButtonCSS.headerBTN}
              onClick={() => navigate(`/post/${username}/update/${params.postId}`)}
            >
              수정하기
            </button>
            <button
              className={ButtonCSS.headerBTN}
              onClick={() => onClickDeleteHandler(post.postId)}
            >
              삭제하기
            </button>
          </div>
        )}
      </div>

      <PostComment />
    </div>
  );
}

export default PostDetail;
