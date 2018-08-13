//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cards: []
  },
  //事件处理函数
  toDetails: function (e) {
    var testid = e.currentTarget.dataset.testid;
    wx.navigateTo({
      url: "/pages/details/details?testid=" + testid
    })
  },
  toFeedback: function (e) {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      cards: app.globalData.cards
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

