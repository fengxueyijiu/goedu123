import React, { Component } from 'react'
import Table from 'antd/lib/table'
import axios from 'axios'
import { settings } from '../../settings'
import './schools.css'
import SchoolTableColumns from './SchoolTableColumns'


class HotSchools extends Component {
  state = {
    schools: [],
  }

  componentWillMount() {
    axios.get(`${settings.api}/schools/hot`)
      .then((res) => {
        this.setState({schools: res.data.schools})
      })
  }

  render() {
    return (
      <div className='schools page'>
        <div className='white-block'>
          <Table columns={SchoolTableColumns}
            dataSource={this.state.schools}
            pagination={{
              defaultPageSize: settings.schoolPageSize
            }}
            rowKey={record => record._id}
          />
        </div>
      </div>
    )
  }
}

export default HotSchools
