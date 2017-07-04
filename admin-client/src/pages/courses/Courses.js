import React, { Component } from 'react'
import Table from 'antd/lib/table'
import axios from 'axios'
import { settings } from '../../settings'

import CourseTableColumns from './CourseTableColumns'

const getCourseCount = () => {
  return axios.get(`${settings.api}/courses/total`)
}

const getCourseList = (page, pageSize) => {
  return axios.get(`${settings.api}/courses`, {params: {page: page, limit: pageSize}})
}

class Courses extends Component {
  state = {
    courses: [],
    total: 0,
  }

  componentWillMount() {
    axios.all([getCourseCount(), getCourseList(1, settings.coursePageSize)])
      .then(axios.spread((first, second) => {
        this.setState({
          total: first.data.total,
          courses: second.data.courses
        })
      }))
  }

  handlePageChange = (page, pageSize) => {
    getCourseList(page, pageSize)
      .then((res) => {
        this.setState({courses: res.data.courses})
      })
  }


  render() {
    return (
      <div className='courses page'>
        <div className='white-block'>
          <div>共{this.state.total}门课程</div>
          <Table columns={CourseTableColumns}
            dataSource={this.state.courses}
            pagination={{
              total: this.state.total,
              defaultPageSize: settings.coursePageSize,
              onChange: this.handlePageChange,
            }}
            rowKey={record => record._id}
          />
        </div>
      </div>
    )
  }
}

export default Courses
