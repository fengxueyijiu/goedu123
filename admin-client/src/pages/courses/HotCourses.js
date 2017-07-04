import React, { Component } from 'react'
import Table from 'antd/lib/table'
import axios from 'axios'
import { settings } from '../../settings'

import CourseTableColumns from './CourseTableColumns'


class HotCourses extends Component {
  state = {
    courses: [],
  }

  componentWillMount() {
    axios.get(`${settings.api}/courses/hot`)
      .then((res) => {
        this.setState({courses: res.data.courses})
      })
  }

  render() {
    return (
      <div className='courses page'>
        <div className='white-block'>
          <Table columns={CourseTableColumns}
            dataSource={this.state.courses}
            pagination={{
              defaultPageSize: settings.coursePageSize
            }}
            rowKey={record => record._id}
          />
        </div>
      </div>
    )
  }
}

export default HotCourses
