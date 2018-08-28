//app.js

App({
  globalData: {
    statusBarHeight: 20,
    userInfo: null,
    cards: []
  },
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code) {
          wx.request({
            url: 'https://wx.bestbwzs.com/login',
            method: 'POST',
            data: {code: res.code},
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data);
              var openid = wx.getStorageSync('openid')
              openid = res.data.openid;
              wx.setStorageSync('openid', openid);
            }
          })
        } else {
          console.log('login failed: '+res.errMsg)
        }
      }
    })
    this.globalData.statusBarHeight=wx.getSystemInfoSync('model').statusBarHeight
    /*
    this.AppMusic = wx.createInnerAudioContext();
    this.AppMusic.autoplay = true;
    this.AppMusic.loop = true;
    this.AppMusic.onPlay(() => {
      console.log('开始播放')
    })
    this.AppMusic.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    */
  }
})