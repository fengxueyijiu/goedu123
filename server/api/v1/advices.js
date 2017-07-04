const Advice = require('../../models/advice')
const config = require('../../config/config')

// 新建议
exports.create = (req, res) => {

}

// 建议列表
exports.index = (req, res, next) => {
  Advice.find()
    .exec()
    .then(advices => {
      res.status(200).json({advices})
    })
    .catch(next)
}
