import axios from 'axios'
import { settings } from '../../settings'
import jwtDecode from 'jwt-decode'

function handleError(error) {
  if (error.response) {
    alert(error.response.data.error)
  } else {
    alert(error)
  }
}

export function setCurrentUser(user) {
  return {
    type: 'AUTH_USER',
    user
  }
}

export function login(data, history) {
  return (dispatch) => {
    axios.post(`${settings.api}/auth/login`, data).then(response => {
      const token = response.data.token
      sessionStorage.setItem('jwtToken', token)
      axios.defaults.headers.common['Authorization'] = `${token}`
      dispatch(setCurrentUser(jwtDecode(token)))
      history.push('/dashboard')
    }).catch(error => {
      handleError(error)
    })
  }
}

export function logout(history) {
  return (dispatch) => {
    sessionStorage.removeItem('jwtToken')
    dispatch(setCurrentUser({}))
    history.push('/')
  }
}
