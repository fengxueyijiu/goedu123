import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth'

import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import Layout from 'antd/lib/layout'
import { withRouter } from 'react-router-dom'

import './sidebar.css'

const { Sider } = Layout
const SubMenu = Menu.SubMenu

class Sidebar extends Component {
  state = {
    theme: 'light',
  }

  handleLogout = () => {
    this.props.logout(this.props.history)
  }

  handleClick = (e) => {
    this.props.history.push(e.key)
  }

  render() {
    const { currentUser } = this.props.auth
    return (
      <Sider className='sidebar' style={{backgroundColor: '#fff'}}>
        <div className='logo'>
          共享教育
        </div>
        <Menu
          style={{borderRight: 'none'}}
          theme={this.state.theme}
          onClick={this.handleClick}
          defaultOpenKeys={['school', 'course']}
          selectedKeys={[this.props.selectedIndex]}
          mode='inline'
        >
          <SubMenu key='school' title={<span><Icon type='file' /><span>学校管理</span></span>}>
            <Menu.Item key='/dashboard'>学校列表</Menu.Item>
            <Menu.Item key='/dashboard/schools/star'>明星学校</Menu.Item>
            <Menu.Item key='/dashboard/schools/hot'>热门学校</Menu.Item>
          </SubMenu>

          <SubMenu key='course' title={<span><Icon type='file' /><span>课程管理</span></span>}>
            <Menu.Item key='/dashboard/courses'>课程列表</Menu.Item>
            <Menu.Item key='/dashboard/courses/hot'>热门课程</Menu.Item>
            <Menu.Item key='/dashboard/courses/cats'>课程分类</Menu.Item>
          </SubMenu>


          <SubMenu key='shop' title={<span><Icon type='file' /><span>店铺管理</span></span>}>
            <Menu.Item key='/dashboard/shops'>店铺列表</Menu.Item>
          </SubMenu>

          <SubMenu key='product' title={<span><Icon type='file' /><span>商品管理</span></span>}>
            <Menu.Item key='/dashboard/products/hot'>热门商品</Menu.Item>
            <Menu.Item key='/dashboard/products/cats'>商品分类</Menu.Item>
          </SubMenu>

          <Menu.Item key='/dashboard/advices'><Icon type='file' />客户建议</Menu.Item>
        </Menu>
        <div className='bottom'>
          <div className='logout-btn' onClick={this.handleLogout}>登出</div>
          <div className='email'>{ currentUser.email }</div>
        </div>
      </Sider>
    )
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logout})(withRouter(Sidebar))
