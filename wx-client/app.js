App({
  onLaunch: () => {
    wx.login({
      success: (res) => {
        let code = res.code
        if (code) {
          wx.getUserInfo({
            success: (res) => {
              wx.setStorageSync('user', res.userInfo)
              wx.request({
                // url: 'https://api.haoqicat.com/login',
                 url: 'http://192.168.1.105:6060/v1/login',
                // url: 'http://192.168.0.104:3000/v1/login',
                method: 'POST',
                data: {
                  code: code
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res.data.token)
                  wx.setStorageSync('token', res.data.token)
                }
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  defaultCity: '',
  defaultCounty: ''
})
