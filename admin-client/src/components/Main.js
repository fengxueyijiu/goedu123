import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Home from '../pages/home/Home'
import Dashboard from '../pages/Dashboard'
import NoMatch from '../pages/NoMatch'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    sessionStorage.jwtToken ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }} />
    )
  )}/>
)

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <PrivateRoute path="/dashboard" component={Dashboard}/>
    <Route component={NoMatch} />
  </Switch>
)

export default Main
