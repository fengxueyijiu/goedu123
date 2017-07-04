Page({
  data: {
    userInfo: {}
  },
  onLoad: function () {
    const value = wx.getStorageSync('user')
    this.setData({ userInfo: value })
    const token = wx.getStorageSync('token')
    wx.request({
      url: 'https://api.haoqicat.com/user/courses',
      header: {
        'authorization': token
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})