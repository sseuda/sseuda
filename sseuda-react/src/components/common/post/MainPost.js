import React from 'react'
import { useNavigate } from 'react-router-dom'

function Post({
  // post의 객체구조 분해하여 내부 속성 꺼내기
    post: {postId, postTitle, userId, postContent, postCreateAt, postUpdateAt, viewCount, postDelete, smallCategoryId}
}) {

    const navigate = useNavigate();

    //  게시글을 클릭하면 해당 상세 페이지로 이동하는 함수
    //  'replace : false' -> 브라우저의 뒤로가기 기능 유지
    const onClickPostHandler = postId => {
        navigate(`/post/${postId}`, {replace: false});
    };

  return (
    <div>
        <div>
          <div>
            <p>{userId}</p>
          </div>

          <div>
            <div>
              <h2>{postTitle}</h2>
            </div>
            <div>
              <p>{postContent}</p>
            </div>
          </div>
        </div>
        <div>
          <img src={postContent} alt={postTitle}/>
        </div>
    </div>
  )
}

export default Post