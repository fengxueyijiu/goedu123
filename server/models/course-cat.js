var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CourseCatSchema = new Schema(
  {
    name: {type: String, required: true},
    parent: {type: Schema.Types.ObjectId, ref: 'CourseCat'},
    ancestors: [{
      _id: {type: Schema.Types.ObjectId},
      name: String
    }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('CourseCat', CourseCatSchema, 'courseCats');
