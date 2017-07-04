import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Select from 'antd/lib/select'
import { connect } from 'react-redux'
import { getCourseCats, addCourseCat } from '../../redux/actions/courseCat'
import './cats.css'
import CourseCat from './CourseCat'

const FormItem = Form.Item
const Option =  Select.Option

class CourseCats extends Component {
  state = {
    visible: false,
    cat: '',
    parent: '',
    cultrue: false,
    preschool: false,
  }

  componentWillMount = () => {
    this.props.getCourseCats()
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  showCultrueModal = () => {
    this.setState({
      cultrue: true,
    })
  }

  handleCultrueCancel = () => {
    this.setState({
      cultrue: false,
    })
  }

  handleCultrueOk = (e) => {
    this.setState({
      confirmLoading: true,
    })
    const data = {
      cat: this.state.cat,
      parent: this.state.parent,
    }

    this.props.addCourseCat(data).then(() => {
      this.setState({cat: '', cultrue: false, confirmLoading: false})
    })
  }

  showPreschoolModal = () => {
    this.setState({
      preschool: true,
    })
  }

  handlePreschoolCancel = () => {
    this.setState({
      preschool: false,
    })
  }

  handlePreschoolOk = (e) => {
    this.setState({
      confirmLoading: true,
    })
    const data = {
      cat: this.state.cat,
      parent: '幼教',
    }

    this.props.addCourseCat(data).then(() => {
      this.setState({cat: '', preschool: false, confirmLoading: false})
    })
  }

  handleNameChange = (e) => {
    this.setState({cat: e.target.value})
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  handleOk = (e) => {
    this.setState({
      confirmLoading: true,
    })
    const data = {
      cat: this.state.cat,
      parent: this.state.parent,
    }

    this.props.addCourseCat(data).then(() => {
      this.setState({cat: '', visible: false, confirmLoading: false})
    })
  }

  optionList = (options) => {
    return options.map((cat, i) => {
      return <Option value={cat} key={i}>{cat}</Option>
    })
  }

  handleParentCat = (value) => {
    this.setState({parent: value})
  }

  getCatList = (parent) => {
    return this.props.courseCats.filter(cat => {
      return cat.ancestors.length !== 0 && cat.ancestors[0].name === parent
    }).map(cat => {
      return <CourseCat category={cat} key={cat._id} />
    })
  }

  render = () => (
    <div className='cat-page page'>
     <div className='white-block'>
       <div className='title'>艺术</div>
       <div className='group'>音乐</div>
       <div className='cat-list'>{this.getCatList('音乐')}</div>
       <div className='group'>舞蹈</div>
       <div className='cat-list'>{this.getCatList('舞蹈')}</div>
       <div className='group'>美术</div>
       <div className='cat-list'>{this.getCatList('美术')}</div>
       <Button type="primary" onClick={this.showModal}>添加分类</Button>
       <Modal title='添加分类'
         visible={this.state.visible}
         onOk={this.handleOk}
         confirmLoading={this.state.confirmLoading}
         onCancel={this.handleCancel}
       >
         <FormItem>
           <Select
             style={{ width: 200, marginBottom: 30 }}
             placeholder='请先选择父类'
             onChange={this.handleParentCat}
           >
             {this.optionList(['音乐', '舞蹈', '美术'])}
           </Select>
           <Input placeholder='分类名称' value={this.state.cat} onChange={this.handleNameChange} />
         </FormItem>
       </Modal>
     </div>

     <div className='white-block'>
       <div className='title'>文化</div>
       <div className='group'>小学</div>
       <div className='cat-list'>{this.getCatList('小学')}</div>
       <div className='group'>中学</div>
       <div className='cat-list'>{this.getCatList('中学')}</div>
       <div className='group'>高中</div>
       <div className='cat-list'>{this.getCatList('高中')}</div>
       <Button type="primary" onClick={this.showCultrueModal}>添加分类</Button>
       <Modal title='添加分类'
         visible={this.state.cultrue}
         onOk={this.handleCultrueOk}
         confirmLoading={this.state.confirmLoading}
         onCancel={this.handleCultrueCancel}
       >
         <FormItem>
           <Select
             style={{ width: 200, marginBottom: 30 }}
             placeholder='请先选择父类'
             onChange={this.handleParentCat}
           >
             {this.optionList(['小学', '中学', '高中'])}
           </Select>
           <Input placeholder='分类名称' value={this.state.cat} onChange={this.handleNameChange} />
         </FormItem>
       </Modal>
     </div>


     <div className='white-block'>
       <div className='title'>幼教</div>
       <div className='cat-list'>{this.getCatList('幼教')}</div>
       <Button type="primary" onClick={this.showPreschoolModal}>添加分类</Button>
       <Modal title='添加分类'
         visible={this.state.preschool}
         onOk={this.handlePreschoolOk}
         confirmLoading={this.state.confirmLoading}
         onCancel={this.handlePreschoolCancel}
       >
         <FormItem>
           <Input placeholder='分类名称' value={this.state.cat} onChange={this.handleNameChange} />
         </FormItem>
       </Modal>
     </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    courseCats: state.courseCats,
  }
}


export default connect(mapStateToProps, {getCourseCats, addCourseCat})(CourseCats)
