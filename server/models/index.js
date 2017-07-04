const mongoose = require('mongoose')
const config   = require('../config/config')
const Admin = require('./admin')

mongoose.Promise = global.Promise
mongoose.connect(config.db, {
  server: {poolSize: 20}
}, function (err) {
  if (err) {
    process.exit(1)
  }
  Admin.findOne({email: config.superMan.email}, function(err, admin) {
    if(admin) return
    let newAdmin = new Admin({
      email: config.superMan.email,
      password: config.superMan.password,
      admin: true
    })
    newAdmin.save()
  })
})

// models
require('./user')
require('./school')
require('./course')
require('./course-cat')
require('./advice')
require('./school-comment')
