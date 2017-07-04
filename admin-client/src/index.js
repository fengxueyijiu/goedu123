import React from 'react'
import { render } from 'react-dom'

import axios from 'axios'
import jwtDecode from 'jwt-decode'

import { store } from './redux/store'
import { setCurrentUser } from './redux/actions/auth'
import App from './components/App'

import './styles/index.css'

function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

if (sessionStorage.jwtToken) {
  setAuthorizationToken(sessionStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(sessionStorage.jwtToken)))
}


render(<App />, document.getElementById('root'))
