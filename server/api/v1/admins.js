const Admin = require('../../models/admin')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const axios = require('axios')

let generateToken = (admin) => {
  return jwt.sign(admin, config.secret, {
    expiresIn: 86400
  })
}

exports.login = (req, res) => {
  Admin.findOne({ email: req.body.email }, (err, admin) => {
    if(err) { return console.log(err) }
    if(!admin) { return res.status(403).json({error: '用户不存在！'}) }
    admin.comparePassword(req.body.password, (err, isMatch) => {
      if(err) { return console.log(err) }
      if (!isMatch) { return res.status(403).json({error: "密码无效！" }) }
      if(admin.admin === true) {
        return res.json({
          token: generateToken({_id: admin._id, email: admin.email, admin: admin.admin})
        })
      } else {
        return res.json({
          token: generateToken({_id: admin._id, email: admin.email})
        })
      }
    })
  })
}
