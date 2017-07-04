import React, { Component } from 'react'
import axios from 'axios'
import { settings } from '../../settings'
import moment from 'moment'
import '../../styles/item-details.css'
import Button from 'antd/lib/button'
import Alert from 'antd/lib/alert'
import { Link } from 'react-router-dom'

class Course extends Component {
  state = {
    course: {},
    message: ''
  }

  componentWillMount() {
    axios.get(`${settings.api}/courses/${this.props.match.params.courseId}`)
      .then((res) => {
        this.setState({course: res.data.course})
      })
  }

  setHotCourse = () => {
    const courseId = this.props.match.params.courseId
    axios.post(`${settings.api}/courses/hot`, {courseId})
      .then(res => {
        this.setState({message: res.data.message})
      })
  }

  cancelHotCourse = () => {
    const courseId = this.props.match.params.courseId
    axios.put(`${settings.api}/courses/hot`, {courseId})
      .then(res => {
        this.setState({message: res.data.message})
      })
  }

  render() {
    let course = this.state.course

    return (
      <div className='single page'>

        <div className='white-block details'>
          <div className='title'>课程信息</div>
          <div className='block'>
            <div className='label'>所属学校</div>
            <Link to={`/dashboard/schools/${course.school ? course.school._id : ''}`}>
              {course.school ? course.school.name : ''}
            </Link>
          </div>
          <div className='block'>
            <div className='label'>名称</div>
            <div>{course.name}</div>
          </div>
          <div className='block'>
            <div className='label'>课时</div>
            <div>{course.classPeriod}</div>
          </div>
          <div className='block'>
            <div className='label'>价格</div>
            <div>{course.price}</div>
          </div>
          <div className='block'>
            <div className='label'>市场价格</div>
            <div>{course.marketPrice}</div>
          </div>
          <div className='block'>
            <div className='label'>课程简介</div>
            <div>{course.intro}</div>
          </div>
          <div className='block'>
            <div className='label'>注意事项</div>
            <div>{course.notice}</div>
          </div>
          <div className='block'>
            <div className='label'>创建时间</div>
            <div>{ moment(course.createdAt).format('YYYY-MM-DD kk:mm:ss') }</div>
          </div>
          <div className='block'>
            <div className='label'>更新时间</div>
            <div>{ moment(course.updatedAt).format('YYYY-MM-DD kk:mm:ss') }</div>
          </div>
        </div>

        <div style={{marginTop: 30}} className='white-block clearfix'>
          <div className='title'>操作</div>
          {this.state.message !== '' ? (
            <Alert
              message={this.state.message}
              type="success"
              showIcon
            />
          ) : ''}
          { course.hot ? <Button onClick={this.cancelHotCourse}>取消热门课程</Button> : <Button onClick={this.setHotCourse}>设置热门课程</Button>}

        </div>
      </div>
    )
  }
}

export default Course
