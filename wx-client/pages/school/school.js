// pages/school/school.js
// Page({
//   data: {
//     link: '',
//     detail: []
//   },
//   onLoad: function (options) {
//     let that = this
//     that.setData({ link: options.link })
//     wx.request({
//       url: `https://raw.githubusercontent.com/happypeter/weapp-demo/master/doc/${options.link}.json`,
//       success: function (res) {
//         that.setData({ detail: res.data })
//         console.log(res.data)
//       },
//       fail: function () {
//         console.log('fail')
//       }
//     })
//   }
// })

Page({
  data: {
    courses: [],
    show:false
  },
  onLoad: function(options) {
    console.log(options);
    wx.setNavigationBarTitle({
      title: options.link
    })
    var that = this
    wx.request({
      url: 'https://raw.githubusercontent.com/happypeter/weapp-demo/master/doc/index.json',
      success: function(res) {
        that.setData({courses: res.data.published.slice(0,2)})
      },
      fail: function() {
        console.log('fail')
      }
    })
  },
  click:function () {
    var that = this
    that.setData({show: !that.data.show})
    console.log(that.data.show);
  }
})
