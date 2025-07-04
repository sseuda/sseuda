import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { callAdminPostDetailApi, callPostApi } from '../../apis/PostAPICalls';
import { callMemberApi } from '../../apis/MemberAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import { useDispatch } from 'react-redux';

function AdminPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem('accessToken');
  const decoded = accessToken ? decodeJwt(accessToken) : null;

  const [post, setPost] = useState(null);
  const [loginUserId, setLoginUserId] = useState(null);
  const [loginUserAuth, setLoginUserAuth] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
  const fetchData = async () => {
    try {
      const postData = await dispatch(callAdminPostDetailApi(postId));
        setPost(postData);

      if (!accessToken || !decoded?.sub) {
        alert("로그인이 필요합니다.");
        navigate('/');
        return;
      }

      const loginUserId = decoded.sub;
      const loginUserAuth = decoded.auth || decoded.authorities;

      console.log("loginUserId??? ", loginUserId);
      console.log("loginUserAuth??? ", loginUserAuth);

      const isAdmin = Array.isArray(loginUserAuth)
        ? loginUserAuth.includes('ROLE_ADMIN') || loginUserAuth.includes('SUPER')
        : loginUserAuth === 'ROLE_ADMIN' || loginUserAuth === 'SUPER';

      const isWriter = loginUserId == postData.memberDTO.userId;

      // 삭제된 게시글이면 권한 검사
      if (postData.postDelete === 'Y') {
        if (!(isAdmin || isWriter)) {
          alert('이 게시글은 삭제된 상태입니다.');
          navigate('/');
          return;
        }
        if (window.location.pathname !== `/post/admin/${postId}`) {
          navigate(`/post/admin/${postId}`);
        }
      }

      // 일반 접근 제한
      if (!(isAdmin || isWriter)) {
        alert("접근 권한이 없습니다.");
        navigate('/');
        return;
      }

      setLoading(false);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  fetchData();
}, [postId]);


  if (loading) return <p>로딩 중...</p>;

  return (
    <div>
      <h1>관리자 모드 게시글 상세</h1>
      <h2>{post.postTitle}</h2>
      <p>작성자: {post.memberDTO?.userNickname}</p>
      <div dangerouslySetInnerHTML={{ __html: post.postContent }} />
    </div>
  );
}

export default AdminPost;
