const jwt = require('jsonwebtoken')
const config = require('../config/config')
const Admin = require('../models/admin')

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
        Admin.findById({_id: decoded._id }).then(admin => {
          if (!admin) {
            res.status(422).json({ error: '用户不存在' })
          } else {
            if(admin.admin !== true) {return res.status(403).json({error: '没有操作权限'})}
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
