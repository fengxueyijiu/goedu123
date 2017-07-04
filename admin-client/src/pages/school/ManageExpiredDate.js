import React, { Component } from 'react'
import DatePicker from 'antd/lib/date-picker'
import axios from 'axios'
import Icon from 'antd/lib/icon'
import { settings } from '../../settings'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

class ManageExpiredDate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      time: ''
    }
  }


  onChange = (value, expiredDate) => {
    if(expiredDate) {
      const schoolId = this.props.schoolId
      const hot = this.props.hot
      axios.put(`${settings.api}/school/expired-date`, {expiredDate, schoolId, hot})
        .then(res => {
          this.setState({time: moment(res.data.date).format('YYYY-MM-DD kk:mm:ss')})
        })
    }
  }

  onOk = (value) => {
    if(value) {
      const expiredDate = moment(value).format('YYYY-MM-DD kk:mm:ss')
      const schoolId = this.props.schoolId
      const hot = this.props.hot
      axios.put(`${settings.api}/school/expired-date`, {expiredDate, schoolId, hot})
        .then(res => {
          this.setState({time: moment(res.data.date).format('YYYY-MM-DD kk:mm:ss')})
        })
    }
  }

  showDataPicker = () => {
    this.setState({visible: !this.state.visible})
  }

  render = () => {
    return (
      <div className='block'>
        <div className='label'>{this.props.text}</div>
        <div className='expired-date'>{ this.state.time ? moment(this.state.time).format('YYYY-MM-DD kk:mm:ss') : (
          this.props.date ? moment(this.props.date).format('YYYY-MM-DD kk:mm:ss') : '空'
        ) }</div>
        {
          this.state.visible ? (
            <DatePicker
              showTime
              format="YYYY-MM-DD kk:mm:ss"
              placeholder="选择日期和时间"
              onChange={this.onChange}
              onOk={this.onOk}
            />
          ) : ''
        }
        <div onClick={this.showDataPicker} className='edit-icon'>
          <Icon type='edit' style={{fontSize: 16, color: '#108ee9'}} />
        </div>

      </div>
    )
  }
}

export default ManageExpiredDate
