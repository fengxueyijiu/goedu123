import React from 'react'

const CourseList = ({courses}) => {
  const list = courses.map((course, index) => (
    <div key={index}>{course.name}</div>
  ))
  return (
    <div style={{marginTop: 30}} className='white-block clearfix'>
      <div className='title'>学校课程</div>
      <div>{list}</div>
    </div>
  )
}


export default CourseList
