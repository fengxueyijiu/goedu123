import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteCourseCat, updateCourseCat} from '../../redux/actions/courseCat'

import Icon from 'antd/lib/icon'
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import Form from 'antd/lib/form'

const FormItem = Form.Item
const confirm = Modal.confirm

class CourseCat extends Component {
  state = {
    visible: false,
    name: ''
  }

  showModal(cat) {
    this.setState({
      visible: true,
      name: cat.name
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  handleUpdate(cat) {
    this.setState({
      confirmLoading: true,
    })

    this.props.updateCourseCat(cat._id, {cat: this.state.name})
      .then(() => {
        this.setState({name: '', visible: false, confirmLoading: false})
      })
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  showConfirm() {
    confirm({
      title: '确认删除分类？',
      onOk: () => {
        this.props.deleteCourseCat(this.props.category._id)
      },
      onCancel() {},
    })
  }

  render() {
    const cat = this.props.category
    return (
      <div>
        <div className='cat'>
          <div className='name'>{cat.name}</div>
          <div className='actions'>
            <div onClick={this.showModal.bind(this, cat)}><Icon type='edit' style={{color: '#108ee9'}}/></div>
            <div onClick={this.showConfirm.bind(this)}><Icon type='delete' style={{color: '#f50'}}/></div>
          </div>
        </div>
        <Modal title='更新图标分类'
          visible={this.state.visible}
          onOk={this.handleUpdate.bind(this, cat)}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <FormItem>
            <Input placeholder='分类名称' value={this.state.name} onChange={this.handleNameChange} />
          </FormItem>
        </Modal>
      </div>
    )
  }
}

export default connect(null, {deleteCourseCat, updateCourseCat})(CourseCat)
