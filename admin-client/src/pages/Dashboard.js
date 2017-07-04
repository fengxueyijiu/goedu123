import React from 'react'
import Sidebar from './sidebar/Sidebar'
import { Route, Switch } from 'react-router-dom'

import Schools from './schools/Schools'
import HotSchools from './schools/HotSchools'
import StarSchools from './schools/StarSchools'
import School from './school/School'
import CourseCats from './cats/CourseCats'
import './dashboard.css'

import Courses from './courses/Courses'
import HotCourses from './courses/HotCourses'
import Course from './course/Course'

import Advices from './advices/Advices'

const Dashboard = ({match, history}) => (
  <div className='dashboard'>
    <Sidebar selectedIndex={history.location.pathname}/>
    <div className='main'>
      <div className='top-header'></div>
      <div className='content'>
        <Switch>
          <Route exact path={`${match.url}`} component={Schools} />
          <Route path={`${match.url}/schools/hot`} component={HotSchools} />
          <Route path={`${match.url}/schools/star`} component={StarSchools} />
          <Route path={`${match.url}/schools/:schoolId`} component={School} />
          <Route exact path={`${match.url}/courses`} component={Courses} />
          <Route path={`${match.url}/courses/hot`} component={HotCourses} />
          <Route path={`${match.url}/courses/cats`} component={CourseCats} />
          <Route path={`${match.url}/courses/:courseId`} component={Course} />
          <Route exact path={`${match.url}/advices`} component={Advices} />
        </Switch>
      </div>
    </div>
  </div>
)

export default Dashboard
