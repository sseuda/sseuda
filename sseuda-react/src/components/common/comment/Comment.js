import React from 'react';
import CommentCSS from './css/Comment.module.css';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from '../../../utils/tokenUtils';
import CommentUpdate from './CommentUpdate';

function Comment({
    comment: {commentId, commentText, commentCreateAt, commentUpdateAt, commentDelete, postDTO, memberDTO},
    onEdit
}) {

    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');
    const decodedToken = accessToken ? decodeJwt(accessToken) : null;

    const isOwner = decodedToken?.sub === memberDTO?.username;

    const updateHandler = ({commentId, username}) =>{
        navigate(`/post/comment/${username}/update?commentId=${commentId}`);
    } 

    console.log("memberDTO:", memberDTO);
    console.log(decodedToken?.sub);

  return (
    <>
        <div className={CommentCSS.userBox}>
            <div className={CommentCSS.nickBox}>
                <h4>
                    {memberDTO?.userNickname}
                </h4>
            </div>
            <div className={CommentCSS.textBox}>
                <p>
                    {commentText}
                </p>
            </div>
            <div className={CommentCSS.createAtBox}>
                <h5>
                    {commentCreateAt}
                </h5>
            </div>
            <div>
                {isOwner && (
                    <button onClick={onEdit}>수정</button>
                )}
            </div>
            
        </div>
    </>
  )
}

export default Comment;