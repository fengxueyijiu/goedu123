// pages/allClassify/allClassify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicClassify:"钢琴",
    danceClassify:"舞蹈",
    paintingClassify:"美术",
    courses:[],
    current: 0
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
  },
  danceClick: function (e) {
    this.setData({
      danceClassify: e.currentTarget.dataset.name
    })
  },
  paintingClick: function (e) {
    this.setData({
      paintingClassify: e.currentTarget.dataset.name
    })
  },


  musicIndex: function(){
    this.setData({
      current: 0
    })
  },
  danceIndex: function (){
    this.setData({
      current: 1
    })
  },
  paintingIndex: function(){
    this.setData({
      current: 2
    })
  },

  change: function (e) {
    this.setData({
      current: e.detail.current
    })
  }
})
