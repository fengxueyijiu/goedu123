import React from 'react'

const CommentList = ({comments}) => {
  const list = comments.map((comment, index) => (
    <div key={index}>{comment.content}</div>
  ))
  return (
    <div style={{marginTop: 30}} className='white-block clearfix'>
      <div className='title'>学校评论</div>
      <div>{list}</div>
    </div>
  )
}


export default CommentList
