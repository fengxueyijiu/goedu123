import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/auth'

import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
const FormItem = Form.Item

class LogInForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    this.props.login({email, password}, this.props.history)
  }

  render = () => (
    <Form onSubmit={this.handleSubmit} className='login-form'>
      <FormItem>
        <Input prefix={<Icon type='mail' style={{ fontSize: 14 }} />} placeholder='email'
        type='text'
        name='email' />
      </FormItem>
      <FormItem>
        <Input prefix={<Icon type='lock' style={{ fontSize: 14 }} />} type='password'
        name='password'
        placeholder='Password' ref={(value) => this.password = value} />
      </FormItem>
      <FormItem>
        <Button type='primary' htmlType='submit' className='login-form-button'>登录</Button>
      </FormItem>
    </Form>
  )
}

export default connect(null, { login })(withRouter(LogInForm))
