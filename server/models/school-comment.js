const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SchoolCommentSchema = new Schema(
  {
    content: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    school: {type: Schema.Types.ObjectId, ref: 'School'},
  },
  { timestamps: true }
)

module.exports = mongoose.model('SchoolComment', SchoolCommentSchema, 'schoolComments')
