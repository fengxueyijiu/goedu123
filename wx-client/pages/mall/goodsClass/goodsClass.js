
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicClassify:"钢琴",
    courses:[]
  },

  onLoad: function() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: 'https://raw.githubusercontent.com/happypeter/weapp-demo/master/doc/index.json',
      success: function(res) {
        that.setData({courses: res.data.published})
        setTimeout(function(){
          wx.hideLoading()
        },1000)
      },
      fail: function() {
        console.log('fail')
      }
    })
  },

  musicClick: function (e) {
    this.setData({
      musicClassify: e.currentTarget.dataset.name
    })
  }
})
