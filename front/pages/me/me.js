// pages/me/me.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    nickName: '',
    records: []
  },
  toDetails: function(e) {
    var test_id = e.currentTarget.dataset.test_result[0];
    var result_id = e.currentTarget.dataset.test_result[1];
    console.log('result_id');
    console.log(e.currentTarget.dataset.test_result[1]);
    wx.navigateTo({
      url: '/pages/details/details?test_id='+test_id+'&result_id='+result_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载您的测试数据',
    })
    wx.request({
      url: 'https://wx.bestbwzs.com/user/test',
      data: {"openid": wx.getStorageSync("openid")},
      method : "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res){
        if(res.data.length==undefined){
          console.log(res.data.message);
          wx.showToast({
            title: '加载失败',
            icon: 'none',
            image: '',
            duration: 2000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          that.setData({
            records: res.data,
            avatar: app.globalData.userInfo.avatarUrl,
            nickName: app.globalData.userInfo.nickName
          })
        }
      },
      fail: function(res){},
      complete: function(res){
        wx.hideLoading();
      }
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})