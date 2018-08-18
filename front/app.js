//app.js

App({
  globalData: {
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
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function (res) {
              console.log(res.data);
              var openid = wx.getStorageSync('openid')
              openid = res.data
              wx.setStorageSync('openid', openid);
            }
          })
        } else {
          console.log('login failed: '+res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
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
  }
})