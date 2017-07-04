import axios from 'axios'
import {settings} from '../../settings'

function handleError(error) {
  if (error.response) {
    alert(error.response.data.error);
  } else {
    alert(error);
  }
}

export function addCourseCat(data) {
  return function(dispatch) {
    return axios.post(`${settings.api}/course/cats`, data)
      .then(response => {
        dispatch({ type: 'ADD_COURSE_CAT', payload: response.data.cat });
      }).catch(error => {
        handleError(error)
      })
  }
}

export function updateCourseCat(id, data) {
  return function(dispatch) {
    return axios.put(`${settings.api}/course/cats/${id}`, data)
      .then(response => {
        dispatch({ type: 'UPDATE_COURSE_CAT', payload: response.data.cat });
      }).catch(error => {
        handleError(error)
      })
  }
}

export function deleteCourseCat(id) {
  return function(dispatch) {
    axios.delete(`${settings.api}/course/cats/${id}`)
    .then(response => {
      dispatch({ type: 'DELETE_COURSE_CAT', payload: response.data.id });
    }).catch(error => {
      handleError(error)
    })
  }
}

export function getCourseCats() {
  return function(dispatch) {
    axios.get(`${settings.api}/course/cats`)
      .then(response => {
        dispatch({ type: 'GET_COURSE_CATS', payload: response.data.cats });
      }).catch(error => {
        handleError(error)
      })
  }
}
