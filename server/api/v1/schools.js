const School = require('../../models/school')
const Course = require('../../models/course')
const SchoolComment = require('../../models/school-comment')
const config = require('../../config/config')
const Q = require('q')

// 校方商家接口
exports.create = (req, res) => {

}

exports.index = (req, res, next) => {
  let page = parseInt(req.query.page, 10) || 1
  page = page > 0 ? page : 1
  const limit = Number(req.query.limit) || config.schoolPageSize
  const query = {}
  const options = {
    skip: (page - 1) * limit,
    limit: limit,
    sort: '-createdAt'
  }

  School.find(query, '', options)
    .exec()
    .then((schools) => {
      res.status(200).json({schools})
    })
    .catch(next)
}
// 学校个数
exports.total = (req, res, next) => {
  const query = {}
  School.count(query).then((total) => {
    res.status(200).json({total})
  }).catch(next)
}

exports.delete = (req, res, next) => {
  School.findById({_id: req.params.schoolId})
    .exec()
    .then((school) => {
      return school.remove().then(() => {
        res.status(200).json({message: '学校删除成功！'})
      })
    })
    .catch(next)
}

// 热门学校
exports.hot = (req, res, next) => {
  School.find({hot: true})
    .exec()
    .then((schools) => {
      res.status(200).json({schools})
    })
    .catch(next)
}

exports.markHot = (req, res, next) => {
  School.findById({_id: req.body.schoolId}).exec().then((school) => {
    school.hot = true
    return school.save().then(() => {
      res.status(200).json({message: '已经设置为热门学校！'})
    })
  }).catch(next)
}

exports.unmarkHot = (req, res, next) => {
  School.findById({_id: req.body.schoolId})
    .exec()
    .then((school) => {
      school.hot = false
      return school.save().then((err) => {
        res.status(200).json({message: '已经取消热门学校！'})
      })
    })
    .catch(next)
}

// 明星学校，小程序首页 banner 中显示的学校
exports.star = (req, res, next) => {
  School.find({star: true})
    .exec()
    .then((schools) => {
      res.status(200).json({schools})
    })
    .catch(next)
}

exports.markStar = (req, res, next) => {
  School.findById({_id: req.body.schoolId})
    .exec()
    .then((school) => {
      school.star = true
      return school.save().then(() => {
        res.status(200).json({message: '已经设置为明星学校！'})
      })
    })
    .catch(next)
}

exports.unmarkStar = (req, res, next) => {
  School.findById({_id: req.body.schoolId})
    .exec()
    .then((school) => {
      school.star = false
      return school.save().then(() => {
        res.status(200).json({message: '已经取消明星学校！'})
      })
    })
    .catch(next)
}

exports.uploadStarPoster = (req, res, next) => {
  School.findById({_id: req.params.schoolId})
    .exec()
    .then((school) => {
      school.poster = [].concat([req.file.filename])
      return school.save().then((school) => {
        res.status(200).json({
          message: '学校海报上传成功！',
          url: `${config.host}/uploads/stars/${school.poster}`
        })
      })
    })
    .catch(next)
}

exports.removeStarPoster = (req, res, next) => {
  School.findById({_id: req.params.schoolId})
    .exec()
    .then((school) => {
      school.poster = []
      return school.save().then(() => {
        res.status(200).json({message: '已经删除学校海报！'})
      })
    })
    .catch(next)
}


// 一所学校的信息
exports.single = (req, res, next) => {
  School.findById({_id: req.params.schoolId})
    .exec()
    .then((school) => {
      Q.all([
        Course.find({school: school._id}).exec(),
        SchoolComment.find({school: school._id}).exec()
      ])
      .then(results => {
        res.status(200).json({
          school,
          courses: results[0],
          comments: results[1],
        })
      })
    })
    .catch(next)
}

exports.expiredDate = (req, res, next) => {
  School.findById({_id: req.body.schoolId})
    .exec()
    .then(school => {
      if(req.body.hot) {
        school.hotExpiredDate = req.body.expiredDate
        return school.save().then((school) => {
          res.status(200).json({
            date: school.hotExpiredDate
          })
        })
      } else {
        school.starExpiredDate = req.body.expiredDate
        return school.save().then((school) => {
          res.status(200).json({
            date: school.starExpiredDate
          })
        })
      }
    })
    .catch(next)
}
