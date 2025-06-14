import React from 'react';
import CommentCSS from './css/Comment.module.css';

function Comment({
    comment: {commentId, commentText, commentCreateAt, commentUpdateAt, commentDelete, postDTO, memberDTO}
}) {

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
        </div>
    </>
  )
}

export default Comment;