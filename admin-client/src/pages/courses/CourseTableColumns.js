import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const CourseTableColumns = [{
  title: '课程名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '价格',
  dataIndex: 'price',
  key: 'price',
}, {
  title: '简介',
  dataIndex: 'intro',
  key: 'intro',
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
    return <Link to={`/dashboard/courses/${text}`}>查看</Link>
  },
}]

export default CourseTableColumns
