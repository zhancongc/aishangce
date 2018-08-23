//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    loaded: false,
    cards: []
  },
  toSearch: function(e) {
    wx.navigateTo({
      url: "/pages/search/search"
    })
  },
  toMe: function (e) {
    wx.navigateTo({
      url: '/pages/me/me',
    })
  },
  //事件处理函数
  toDetails: function (e) {
    var test_id = e.currentTarget.dataset.test_id;
    wx.navigateTo({
      url: "/pages/details/details?test_id=" + test_id
    })
  },
  toFeedback: function (e) {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  },
  pageLoad: function () {
    var that = this;
    that.setData({
      loaded: false
    })
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.request({
      url: 'https://wx.bestbwzs.com/index',
      method: 'get',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        app.globalData.cards = res.data;
        that.setData({
          cards: app.globalData.cards,
          loaded: true
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '数据请求失败',
          icon: 'none',
          image: '',
          duration: 2000,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      complete: function (res) {
        console.log(res.data);
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(app.globalData.cards==''){
      that.pageLoad()
    } else {
      that.setData({
        cards: app.globalData.cards,
        loaded: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (app.globalData.cards == '') {
      that.pageLoad()
    } else {
      that.setData({
        cards: app.globalData.cards,
        loaded: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.pageLoad();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})

