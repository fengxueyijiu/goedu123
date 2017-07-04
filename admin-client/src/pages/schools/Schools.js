import React, { Component } from 'react'
import Table from 'antd/lib/table'
import axios from 'axios'
import { settings } from '../../settings'
import './schools.css'
import SchoolTableColumns from './SchoolTableColumns'

const getSchoolCount = () => {
  return axios.get(`${settings.api}/schools/total`)
}

const getSchoolList = (page, pageSize) => {
  return axios.get(`${settings.api}/schools`, {params: {page: page, limit: pageSize}})
}

class Schools extends Component {
  state = {
    schools: [],
    total: 0,
  }

  componentWillMount() {
    axios.all([getSchoolCount(), getSchoolList(1, settings.schoolPageSize)])
      .then(axios.spread((first, second) => {
        this.setState({
          total: first.data.total,
          schools: second.data.schools
        })
      }))
  }

  handlePageChange = (page, pageSize) => {
    getSchoolList(page, pageSize)
      .then((res) => {
        this.setState({schools: res.data.schools})
      })
  }


  render() {
    return (
      <div className='schools page'>
        <div>区域选择</div>
        <div className='white-block'>
          <div>共{this.state.total}所学校</div>
          <Table columns={SchoolTableColumns}
            dataSource={this.state.schools}
            pagination={{
              total: this.state.total,
              defaultPageSize: settings.schoolPageSize,
              onChange: this.handlePageChange,
            }}
            rowKey={record => record._id}
          />
        </div>
      </div>
    )
  }
}

export default Schools
