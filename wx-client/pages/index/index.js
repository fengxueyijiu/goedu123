const config = require('../utils/config.js');
let appInstance = getApp();

Page({
  data: {
    courses: [],
    location: appInstance.defaultCity,
    county: '',
    searchIConShow: false,
    schools: []
  },
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
    this.getLocation();
  },
  onShow: function() {
    this.setData({
      location: (appInstance.defaultCity ? appInstance.defaultCity : '定位中'),
      county: appInstance.defaultCounty
    })
    console.log(appInstance.defaultCity);
    console.log(appInstance.defaultCounty);
  },
  getLocation: function() {
    const that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
            url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${config.key}`,
            success: res => {
              console.log("定位成功")
              let city = res.data.result.ad_info.city
              let county = res.data.result.ad_info.district
              that.setData({
                location: city,
                county: county
              })
              appInstance.defaultCity = city
              appInstance.defaultCounty = county
              console.log(appInstance.defaultCity);
              console.log(appInstance.defaultCounty);
            },
            fail: err => {
              console.log("定位失败");
              console.log(err);
            }
        })
      }
    })
  },

  searchIConShow: function () {
    this.setData({
      searchIConShow: !this.data.searchIConShow
    })

    wx.navigateTo({
        url: '../search/search'
      })
  }
})
