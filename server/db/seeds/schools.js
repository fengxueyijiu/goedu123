
const mongoose = require('mongoose')
const config = require('../../config/config')
const Q = require('q')

mongoose.Promise = global.Promise
mongoose.connect(config.db)

const School = require('../../models/school')
const Course = require('../../models/course')
const CourseCat = require('../../models/course-cat')
const SchoolComment = require('../../models/school-comment')

const schools = []
const courses = []

for(let i = 0; i < 20; i++) {
  schools.push({
    name: 'school' + i,
    city: 'city' + i,
    county: 'county' + i,
    address: 'address' + i,
    intro: 'intro' + i
  })
}

for(let i = 0; i < 5; i++) {
  courses.push({
    name: 'course' + i,
    price: 'price' + i,
    marketPrice: 'marketPrice' + i,
    notice: 'notice' + i,
    intro: 'intro' + i
  })
}

const insertCourses = () => {
  return School.find({}, '', {limit: 20})
    .select('_id')
    .exec()
    .then(schools => {
      return schools.map(school => {
        const newCourses = courses.map(course => {
          // must return a new course object
          return Object.assign({}, course, {school: school._id})
        })
        return Course.insertMany(newCourses)
      })
    })
}

const insertSchoolComments = () => {
  return School.find({}, '', {limit: 20})
    .select('_id')
    .exec()
    .then(schools => {
      return schools.map((school, index) => {
        const comments = Array.from(Array(index).keys()).map(n => {
          return Object.assign({}, {content: 'comment' + n, school: school._id})
        })
        return SchoolComment.insertMany(comments)
      })
    })
}

Q.all([
  School.remove({})
    .then(() => {
      return School.insertMany(schools)
    }),
  Course.remove({}),
  SchoolComment.remove({}),
])
.then(() => {
  return Q.all(insertCourses())
})
.then(() => {
  return Q.all(insertSchoolComments())
})
.then(() => {
  console.log('数据库中注入学校数据完毕!')
  process.exit(0)
})
.catch(err => {
  console.log(err)
})
