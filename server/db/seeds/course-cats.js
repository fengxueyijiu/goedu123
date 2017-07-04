
const mongoose = require('mongoose')
const config = require('../../config/config')
const Q = require('q')

mongoose.Promise = global.Promise
mongoose.connect(config.db)

const CourseCat = require('../../models/course-cat')

const ancestors = [
  {name: '艺术'},
  {name: '文化'},
  {name: '幼教'},
]

const parents = [
  {
    parent: '艺术',
    children: ['音乐', '舞蹈', '美术']
  },
  {
    parent: '文化',
    children: ['小学', '中学', '高中']
  },
  {
    parent: '幼教',
    children: ['幼儿园', '小饭桌', '学前班']
  }
]

const children = [
  {
    parent: '音乐',
    children: ['钢琴','吉他','架子鼓','葫芦丝','电子琴','电钢琴','长笛','竹笛','古筝','小提琴','音基','声乐','二胡','扬琴','琵琶']
  },
  {
    parent: '舞蹈',
    children: ['民族民间舞','拉丁舞','街舞','爵士舞','芭蕾舞','瑜伽']
  },
  {
    parent: '美术',
    children: ['硬笔书法','软笔书法','速写(油画棒)','水粉','素描','国画','手工']
  },
  {
    parent: '小学',
    children: ['语文','数学','英语']
  },
  {
    parent: '中学',
    children: ['语文','数学','英语','物理','化学']
  },
  {
    parent: '高中',
    children: ['语文','数学','英语','物理','化学','历史','地理']
  }
]

const insertCats = (cats) => {
  return cats.map(cat => {
    return CourseCat.findOne({name: cat.parent})
      .exec()
      .then((parent) =>{
        const data = cat.children.map(name => {
          const ancestors = [{_id: parent._id, name: parent.name}].concat(parent.ancestors)
          return {name: name, parent: parent._id, ancestors: ancestors}
        })

        return CourseCat.insertMany(data)
      })
  })
}


CourseCat.remove({})
  .then(() => {
    return CourseCat.insertMany(ancestors)
  })
  .then(() => {
    const defer = Q.defer()
    defer.resolve(Q.all(insertCats(parents)))
    return defer.promise
  })
  .then(() => {
    return Q.all(insertCats(children))
  })
  .then(() => {
    console.log('数据库中注入课程分类数据完毕!')
    process.exit(0)
  })
