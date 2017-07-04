const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

const apiRouterV1 = require('./routes')
const config = require('./config/config')
require('./models')

const isProduction = process.env.NODE_ENV === 'production'

app.use(bodyParser.json())
app.use(logger('dev'))

app.use(express.static(path.join(__dirname, 'public')));

//路由
app.use('/v1', cors(), apiRouterV1)


// 处理开发环境报错
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack)

    res.status(err.status || 500)

    res.json({'errors': {
      message: err.message,
      error: err
    }})
  })
}

// 处理生产环境报错
app.use(function(err, req, res, next) {
  console.log('production')
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }})
})


app.listen(config.port, () => {
  console.log(`running on port ${config.port}...`)
})
