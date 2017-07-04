const express = require('express')
const users = require('./api/v1/users')
const admins = require('./api/v1/admins')
const schools = require('./api/v1/schools')
const courses = require('./api/v1/courses')
const courseCats = require('./api/v1/course-cats')
const advices = require('./api/v1/advices')
const requireAdmin = require('./middlewares/check-admin')

const multer = require('multer')
// 上传学校图片
const starPoster = multer({dest: './public/uploads/stars'})

const router = express.Router()

// 管理员登录接口
router.post('/auth/login', admins.login)

// 用户认证接口
router.post('/signup', users.signup)
router.post('/login', users.login)

// 校商创建学校
router.post('/schools', schools.create)


// 学校列表
router.get('/schools', schools.index)
router.post('/schools', schools.search)

// 学校个数
router.get('/schools/total', schools.total)


// 热门学校
router.get('/schools/hot', schools.hot)
router.post('/schools/hot', requireAdmin, schools.markHot)
router.put('/schools/hot', requireAdmin, schools.unmarkHot)

// 明星学校
router.get('/schools/star', schools.star)
router.post('/schools/star', requireAdmin, schools.markStar)
router.put('/schools/star', requireAdmin, schools.unmarkStar)
// 管理明星学校海报
router.post('/schools/:schoolId/poster', requireAdmin, starPoster.single('poster'), schools.uploadStarPoster)
router.delete('/schools/:schoolId/poster', requireAdmin, schools.removeStarPoster)


// 学校详情
router.get('/schools/:schoolId', schools.single)
// 删除一所学校
router.delete('/schools/:schoolId', requireAdmin, schools.delete)

// 设置学校的过期时间
router.put('/school/expired-date', requireAdmin, schools.expiredDate)


// 热门课程
router.get('/courses/hot', courses.hot)
router.post('/courses/hot', requireAdmin, courses.markHot)
router.put('/courses/hot', requireAdmin, courses.unmarkHot)

// 课程分类
router.post('/course/cats', requireAdmin, courseCats.new)
router.put('/course/cats/:catId', requireAdmin, courseCats.update)
router.delete('/course/cats/:catId', requireAdmin, courseCats.delete)
router.get('/course/cats', courseCats.all)

// 课程列表
router.get('/courses', courses.index)

// 课程个数
router.get('/courses/total', courses.total)
// 课程详情
router.get('/courses/:courseId', courses.single)

// 所属某一分类的课程
router.get('/cats/:cat/courses', courses.belongToCat)



// 用户建议列表
router.get('/advices', requireAdmin, advices.index)

module.exports = router
