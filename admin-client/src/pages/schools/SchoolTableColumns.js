import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const SchoolTableColumns = [{
  title: '学校名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '所在城市',
  dataIndex: 'city',
  key: 'city',
}, {
  title: '所在区县',
  dataIndex: 'county',
  key: 'county',
}, {
  title: '创建时间',
  dataIndex: 'createdAt',
  key: 'createdAt',
  render: (text) => {
    return <span>{moment(text).format('YYYY-MM-DD kk:mm:ss')}</span>
  },
}, {
  title: '更新时间',
  dataIndex: 'updatedAt',
  key: 'updatedAt',
  render: (text) => {
    return <span>{moment(text).format('YYYY-MM-DD kk:mm:ss')}</span>
  },
}, {
  title: '操作',
  dataIndex: '_id',
  key: '_id',
  render: (text) => {
    return <Link to={`/dashboard/schools/${text}`}>查看</Link>
  },
}]

export default SchoolTableColumns
