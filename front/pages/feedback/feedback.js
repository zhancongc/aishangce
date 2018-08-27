// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  feedback: function (e) {
    var weixin = e.detail.value.weixin;
    var content = e.detail.value.content;
    if (content == undefined || content == ''){
      wx.showToast({
        icon: 'none',
        title: '请输入建议内容',
        duration: 2000
      })
    }
    else if (weixin == undefined || weixin == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入您的微信号',
        duration: 2000
      })
    }
    else {
      var data = {
        'weixin': weixin == undefined ? '' : e.detail.value.weixin,
        'content': content == undefined ? '' : e.detail.value.content
      }
      wx.showLoading({
        title: '提交中',
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      wx.request({
        url: 'https://wx.bestbwzs.com/feedback',
        method: 'POST',
        data: data,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) { 
          wx.showToast({
            icon: 'success',
            title: '感谢您的反馈',
            duration: 2000
          })
         },
        fail: function (res) { },
        complete: function (res) {
          
        }
      })
      wx.hideLoading();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})