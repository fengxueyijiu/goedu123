const Course = require('../../models/course')
const config = require('../../config/config')

// 创建课程接口
exports.create = (req, res) => {

}

exports.index = (req, res, next) => {
  let page = parseInt(req.query.page, 10) || 1
  page = page > 0 ? page : 1
  const limit = Number(req.query.limit) || config.coursePageSize
  const query = {}
  const options = {
    skip: (page - 1) * limit,
    limit: limit,
    sort: '-createdAt'
  }

  Course.find(query, '', options)
    .exec()
    .then(courses => {
      res.status(200).json({courses})
    })
    .catch(next)
}

// 课程个数
exports.total = (req, res, next) => {
  const query = {}
  Course.count(query)
    .then(total => {
      res.status(200).json({total})
    })
    .catch(next)
}

// 单门课程
exports.single = (req, res, next) => {
  Course.findById({_id: req.params.courseId})
    .populate('school')
    .exec()
    .then(course => {
      return res.status(200).json({course})
    })
    .catch(next)
}

// 热门课程
exports.hot = (req, res, next) => {
  Course.find({hot: true})
  .exec()
  .then(courses => {
    res.status(200).json({courses})
  })
  .catch(next)
}

exports.markHot = (req, res, next) => {
  Course.findById({_id: req.body.courseId})
    .exec()
    .then(course => {
      course.hot = true
      return course.save().then(course => {
        return res.status(200).json({message: '已经设置为热门课程！'})
      })
    })
    .catch(next)
}

exports.unmarkHot = (req, res, next) => {
  Course.findById({_id: req.body.courseId})
    .exec()
    .then(course => {
      course.hot = false
      return course.save().then(course => {
        res.status(200).json({message: '已经取消热门课程！'})
      })
    })
    .catch(next)
}

// 属于某一分类的课程
exports.belongToCat = (req, res, next) => {
  let page = parseInt(req.query.page, 10) || 1
  page = page > 0 ? page : 1
  const limit = Number(req.query.limit) || config.coursePageSize
  const options = {
    skip: (page - 1) * limit,
    limit: limit,
    sort: '-createdAt'
  }

  if(req.body.catId) {
    // 小程序分类页面的课程
    Courses.find({category: req.body.catId}, '', options)
      .exec()
      .then(courses => {
        return res.status(200).json({courses})
      })
      .catch(next)
  } else {
    // 小程序首页分类课程
    CourseCat.find({name: req.body.cat})
      .exec()
      .then(cats => {
        const catIds = cats.filter(el => el.ancestors.length !== 0 && el.ancestors[0] === req.body.parent)

        return Courses.find({category: catId[0]}, '', options)
          .exec()
          .then(courses => {
            return res.status(200).json({courses})
          })
      })
      .catch(next)
  }
}
