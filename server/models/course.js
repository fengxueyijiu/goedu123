var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    name: String,
    price: String,
    marketPrice: String,
    intro: String,
    notice: String,
    classPeriod: Number,
    hot: Boolean,
    school: {type: Schema.Types.ObjectId, ref: 'School'},
    category: {type: Schema.Types.ObjectId, ref: 'CourseCat'},
  },
  {timestamps: true}
);

module.exports = mongoose.model('Course', CourseSchema);
