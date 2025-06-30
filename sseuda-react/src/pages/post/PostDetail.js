import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callDeletePostsApi, callPostApi } from '../../apis/PostAPICalls';
import Detail from './css/PostDetail.module.css';
import PostComment from '../comment/PostComment';
import ButtonCSS from '../../components/common/Global/Button.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import { callMemberApi } from '../../apis/MemberAPICalls';
import ReportPopup from '../report/ReportPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { callLikeInsertApi, callPostDeleteApi } from '../../apis/LikesAPICalls';

function PostDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const decoded = accessToken ? decodeJwt(accessToken) : null;
  const username = decoded?.sub;  // 또는 decoded?.username 등
  const [loginUserId, setLoginUserId] = useState(null);
  
  const postDetail = useSelector(state => state.postReducer);
  const post = postDetail[0];
  
  const [showReportPopup, setShowReportPopup] = useState(false);

  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    const fetchLoginUser = async () => {
        if (!accessToken || !decoded?.sub) {
            console.log("로그인 되어 있지 않아 유저 정보 불러오지 않음");
            return;
        }

        try {
            const response = await dispatch(callMemberApi(decoded.sub));
            if (response) setLoginUserId(response.userId);
        } catch (error) {
            console.error("로그인 유저 정보 가져오기 실패: ", error);
        }
    };

    fetchLoginUser();
  }, [accessToken, decoded, dispatch]);


  useEffect(() => {
    dispatch(callPostApi(params.postId));
  }, [params.postId]);


  // 신고 팝업 관련
  const handleReportClick = () => {
    if (!loginUserId) {
      alert("로그인 후 신고가 가능합니다!");
      return;
    }
    setShowReportPopup(true)};
  const handleClosePopup = () => setShowReportPopup(false);


  const onClickDeleteHandler = (postId) => {
    try{
      dispatch(callDeletePostsApi({ postId, username }));
      alert("게시글이 삭제되었습니다.");
      navigate('/');
    }catch(e){
      console.warn("삭제 실패: ", e);
      alert("삭제 실패되었습니다.");
    }
  };


  const handleLikeClick = async () => {
  if (!loginUserId) {
    alert("로그인 후 좋아요 가능합니다!");
    return;
  }

  try {
    if(!isClick){
      const form = new FormData();
      form.append('userId', loginUserId);
      form.append('postId', post.postId);

      const result = await dispatch(callLikeInsertApi({
        postId: post.postId,
        form: form,
        username: username
      }));

      // console.log('좋아요 등록 결과:', result);

      setIsClick(true);
    } else{
      const result = await dispatch(callPostDeleteApi({
          postId: post.postId,
          username: username
        }));

        // console.log('좋아요 삭제 성공:', result);
        setIsClick(false);
    }
      
  }catch (error) {
      console.error('좋아요 처리 중 오류:', error);
      alert('좋아요 처리 중 문제가 발생했습니다.');
  }
}



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
            <div>
              <p>{post.viewCount}</p>
            </div>

            <div>
              <button 
              onClick={handleLikeClick} 
              style={{
                backgroundColor : '#fff',
                color: isClick ? '#F5C3A4' : '#757575'
                }}>
                <FontAwesomeIcon icon={faHeart}/>
              </button>
            </div>            
          </div>
        </div>

        {/* 게시글 본문 */}
        <div className={Detail.contentBox} dangerouslySetInnerHTML={{ __html: post.postContent }} />
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