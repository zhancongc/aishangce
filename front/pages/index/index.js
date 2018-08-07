//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 1000,
    cards: [{
      id: 0,
      active: false,
      imageUri: "/images/cornfield.jpg",
      cardPrice: 50,
      cardName: "cornfield"
    }, {
        id: 1,
        active: false,
        imageUri: "/images/waterdrop.jpg",
        cardPrice: 100,
        cardName: "waterdrop"
      }, {
        id: 2,
        active: false,
        imageUri: "/images/island.jpg",
        cardPrice: 200,
        cardName: "island"
      }, {
        id: 3,
        active: false,
        imageUri: "/images/desert.jpg",
        cardPrice: 500,
        cardName: "desert"
      }, {
        id: 4,
        active: false,
        imageUri: "/images/san_francisco.jpg",
        cardPrice: 1000,
        cardName: "San Francisco"
      }, {
        id: 5,
        active: false,
        imageUri: "/images/castle.jpg",
        cardPrice: 5000,
        cardName: "Gemany Castle"
      }]
  },
  //事件处理函数
  toDetails : function (e) {
    var cardid = e.currentTarget.dataset.cardid
    console.log(e.currentTarget.dataset.cardid)
    wx.navigateTo({
      url: "/pages/details/details?cardid="+cardid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData : function () {
    var that = this;
    wx.request({
      url: "https://wx.lightblog.site/",
      data: {
        request: "destinations"
      },
      header: {
        "Content-Type" : "application/json"
      },
      method: "GET",
      success: function(res) {
        console.log(res.data);
        that.setData({
          cards : res.data
        });
      },
      fail: function(error) {},
      complete: function () {
        app.globalData.cards = that.data.cards;
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

