var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const AdviceSchema = new Schema(
  {
    message: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
  },
  { timestamps: true }
)

module.exports = mongoose.model('Advice', AdviceSchema);
