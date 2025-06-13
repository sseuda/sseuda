import React from 'react'

function Comment({
    comment: {commentId, commentText, commentCreateAt, commentUpdateAt, commentDelete, postDTO, memberDTO}
}) {

  return (
    <div>
        <div>
            <div>
                <h4>
                    {memberDTO?.userNickname}
                </h4>
            </div>
            <div>
                <p>
                    {commentText}
                </p>
            </div>
            <div>
                <h5>
                    {commentCreateAt}
                </h5>
            </div>
        </div>
    </div>
  )
}

export default Comment;