const jwt = require('jsonwebtoken')
const config = require('../config/config')
const User = require('../models/user')

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization']
  let token
  if (authHeader) {
    token = authHeader
  }
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        if(err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: '认证码失效，请重新登录' })
        } else {
          return res.status(401).json({ error: '认证失败'})
        }
      } else {
        User.findById({_id: decoded._id }).then(user => {
          if (!user) {
            res.status(422).json({ error: '用户不存在' })
          } else {
            req.user = user._id
            next()
          }
        })
      }
    })
  } else {
    res.status(403).json({
      error: '请提供认证码'
    })
  }
}
