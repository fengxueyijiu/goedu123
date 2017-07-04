// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses:[],
    current: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function() {
     var that = this
     wx.request({
       url: 'https://raw.githubusercontent.com/happypeter/weapp-demo/master/doc/index.json',
       success: function(res) {
         that.setData({courses: res.data.published.slice(0,4)})
       },
       fail: function() {
         console.log('fail')
       }
     })
   },


   schoolsIndex: function(){
     this.setData({
       current: 0
     })
   },
   coursesIndex: function (){
     this.setData({
       current: 1
     })
   },
   shopIndex: function(){
     this.setData({
       current: 2
     })
   },
   commodityIndex: function(){
     this.setData({
       current: 3
     })
   },

   change: function (e) {
     this.setData({
       current: e.detail.current
     })
   }













})
