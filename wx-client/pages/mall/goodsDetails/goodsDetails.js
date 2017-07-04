// pages/mall/goodsDetails/goodsDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    num: 1,
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  goodsClick: function () {
    this.setData({
      current: 0
    })
  },

  detailsClick: function () {
    this.setData({
      current: 1
    })
  },

  commentClick: function () {
    this.setData({
      current: 2
    })
  },

  plus: function () {
    this.setData({
      num: this.data.num + 1
    })
  },
  reduce: function () {
    if (this.data.num == 1 ) {
      return
    } else {
      this.setData({
        num: this.data.num - 1
      })
    }
  },

  blur: function (e) {
    if (e.detail.value=="") {
      this.setData({
        num: 1
      })
    }
  },

  show: function () {
    this.setData({
      show: !this.data.show
    })
  },

  collection: function () {
    wx.showToast({
      title: '收藏成功',
      icon: 'success',
      duration: 1500
    })
  },


  shop: function () {
    wx.navigateTo({
      url: '../shop/shop'
    })
  },
























  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('123');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
