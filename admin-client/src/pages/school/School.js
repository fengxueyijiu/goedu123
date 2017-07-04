import React, { Component } from 'react'
import axios from 'axios'
import { settings } from '../../settings'
import moment from 'moment'
import '../../styles/item-details.css'
import './school.css'
import Button from 'antd/lib/button'
import Alert from 'antd/lib/alert'
import StarPoster from './StarPoster'
import CourseList from './CourseList'
import CommentList from './CommentList'
import ManageExpiredDate from './ManageExpiredDate'

import Modal from 'antd/lib/modal'
const confirm = Modal.confirm

class School extends Component {
  state = {
    school: {},
    courses: [],
    comments: [],
    message: ''
  }

  componentWillMount() {
    axios.get(`${settings.api}/schools/${this.props.match.params.schoolId}`)
      .then((res) => {
        this.setState({
          school: res.data.school,
          courses: res.data.courses,
          comments: res.data.comments,
        })
      })
  }

  setHotSchool = () => {
    const schoolId = this.props.match.params.schoolId
    axios.post(`${settings.api}/schools/hot`, {schoolId})
      .then(res => {
        this.setState({message: res.data.message})
      })
  }

  cancelHotSchool = () => {
    const schoolId = this.props.match.params.schoolId
    axios.put(`${settings.api}/schools/hot`, {schoolId})
      .then(res => {
        this.setState({message: res.data.message})
      })
  }

  setStarSchool = () => {
    const schoolId = this.props.match.params.schoolId
    axios.post(`${settings.api}/schools/star`, {schoolId})
      .then(res => {
        this.setState({message: res.data.message})
      })
  }

  cancelStarSchool = () => {
    const schoolId = this.props.match.params.schoolId
    axios.put(`${settings.api}/schools/star`, {schoolId})
      .then(res => {
        this.setState({message: res.data.message})
      })
  }

  deleteSchool = () => {
    const schoolId = this.props.match.params.schoolId
    axios.delete(`${settings.api}/schools/${schoolId}`)
      .then(res => {
        this.setState({message: res.data.message})
        this.timeout = setTimeout(() => {
          this.props.history.push('/dashboard')
        }, 1500)
      })
  }


  showConfirm = () => {
    confirm({
      title: '确认删除学校？',
      onOk: () => {
        this.deleteSchool()
      },
      onCancel() {},
    })
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout)
  }

  render() {
    const school = this.state.school

    return (
      <div className='single page'>

        <div className='white-block details'>
          <div className='title'>学校信息</div>
          <div className='block'>
            <div className='label'>名称</div>
            <div>{school.name}</div>
          </div>
          <div className='block'>
            <div className='label'>地址</div>
            <div>{school.address}</div>
          </div>
          <div className='block'>
            <div className='label'>简介</div>
            <div>{school.intro}</div>
          </div>
          <div className='block'>
            <div className='label'>创建时间</div>
            <div>{moment(school.createdAt).format('YYYY-MM-DD kk:mm:ss')}</div>
          </div>
          <div className='block'>
            <div className='label'>更新时间</div>
            <div>{moment(school.updatedAt).format('YYYY-MM-DD kk:mm:ss')}</div>
          </div>
          {
            school.hot ? (
              <ManageExpiredDate
                text='热门到期时间'
                date={school.hotExpiredDate}
                schoolId={school._id}
                hot={true}
              />
            ) : '' }

          { school.star ? (
              <ManageExpiredDate
                text='明星到期时间'
                date={school.starExpiredDate}
                schoolId={school._id}
                hot={false}
              />
            ) : ''
          }
        </div>

        <CourseList courses={this.state.courses} />

        <CommentList comments={this.state.comments} />

        {
          school.star && school.poster ? (
            <div style={{marginTop: 30}} className='white-block clearfix'>
              <div className='title'>上传学校海报</div>
              <StarPoster poster={school.poster} id={school._id}/>
            </div>
          ) : ''
        }


        <div style={{marginTop: 30}} className='white-block clearfix'>
          <div className='title'>操作</div>
          {this.state.message !== '' ? (
            <Alert
              message={this.state.message}
              type="success"
              showIcon
            />
          ) : ''}
          { school.hot ? <Button onClick={this.cancelHotSchool}>取消热门学校</Button> : <Button onClick={this.setHotSchool}>设置热门学校</Button>}

          { school.star ? <Button onClick={this.cancelStarSchool}>取消明星学校</Button> : <Button onClick={this.setStarSchool}>设置明星学校</Button> }

          <Button type='danger' onClick={this.showConfirm}>删除学校</Button>
        </div>
      </div>
    )
  }
}

export default School
