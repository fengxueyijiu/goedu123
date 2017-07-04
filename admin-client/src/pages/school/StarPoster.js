import  React, { Component } from 'react'
import Upload from 'antd/lib/upload'
import Icon from 'antd/lib/icon'
import Modal from 'antd/lib/modal'

import axios from 'axios'

import {settings} from '../../settings'

class StarPoster extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  }

  componentWillMount = () => {
    if(this.props.poster.length !== 0) {
      const file = {
        uid: this.props.id,
        status: 'done',
        url: `${settings.serverHost}/uploads/stars/${this.props.poster[0]}`
      }
      this.setState({fileList: [file]})
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleChange = ({file, fileList, event}) => {
    this.setState({ fileList })
  }

  handleRemove = (file) => {
    axios.delete(`${settings.api}/schools/${this.props.id}/poster`, {
      headers: {Authorization: sessionStorage.jwtToken}
    }).then((res) => {
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传学校海报</div>
      </div>
    )
    return (
      <div className="clearfix white-block">
        <Upload
          name='poster'
          action={`${settings.api}/schools/${this.props.id}/poster`}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
          headers={{Authorization: sessionStorage.jwtToken}}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default StarPoster
