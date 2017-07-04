const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean },
  },
  { timestamps: true }
)

AdminSchema.pre('save', function(next) {
  const user = this, SALT_FACTOR = 5
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if(err) return next(err)
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

AdminSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('Admin', AdminSchema)
