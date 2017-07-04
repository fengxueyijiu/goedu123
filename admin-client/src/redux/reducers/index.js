import { combineReducers } from 'redux'
import auth from './auth'
import courseCats from './courseCats'

const rootReducer = combineReducers({
  auth,
  courseCats,
})

export default rootReducer
