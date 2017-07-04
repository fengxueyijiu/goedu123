function categories(state=[], action) {
  switch(action.type) {
    case 'GET_COURSE_CATS':
      return [...action.payload]
    case 'ADD_COURSE_CAT':
      return [...state, action.payload]
    case 'UPDATE_COURSE_CAT':
      return state.map((item, i) => {
        if(item._id === action.payload._id) {
          return action.payload
        } else {
          return item
        }
      })
      case 'DELETE_COURSE_CAT':
        return state.filter(item => item._id !== action.payload)
    default:
      return state
  }
}

export default categories
