import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import Main from './Main'

const App = () => (
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>
)

export default App
