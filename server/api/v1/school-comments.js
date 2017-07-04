const SchoolComment = require('../../models/school-comment')
const config = require('../../config/config')

// 创建课程接口
exports.create = (req, res, next) => {

}

exports.index = (req, res, next) => {
  SchoolComment.find({school: req.body.schoolId})
    .populate('user school')
    .exec()
    .then(comments => {
      res.status(200).json({comments})
    })
    .catch(next)
}
