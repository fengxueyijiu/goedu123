import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import LogInForm from './LogInForm'

const Home = () => (
  <div className='home'>
    <div className='home-content'>
      <div className='title'>
        共享教育
      </div>
      <div>
        {
          sessionStorage.jwtToken ? <Link to='/dashboard' className='enter'>已经登录，进入系统</Link> : <LogInForm />
        }
      </div>
    </div>
  </div>
)

export default Home
