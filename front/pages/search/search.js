// pages/search/search.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searched: 0,
    keywords: ['爱情','吃鸡','运气','内心','性格','颜色'],
    cards: []
  },
  getTest: function(keyword){
    var data = { 'keyword': keyword };
    var that = this;
    wx.showLoading({
      title: '搜索中',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.request({
      url: 'https://wx.bestbwzs.com/test',
      method: 'POST',
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("res.data");
        console.log(res.data);
        if(res.data.length==undefined && res.data.id ==-1){
          that.setData({
            searched: 2,
            cards: []
          })
        } else {
          that.setData({
            searched: 1,
            cards: res.data
          })
          var arr = [];
          for(var i=0; i<app.globalData.cards.length; i++){
            arr.push(app.globalData.cards[i].id)
          }
          for(var i=0; i<res.data.length; i++){
            if(!(res.data[i].id in arr)){
              app.globalData.cards.push(res.data[i])
            }
          }
        }
      },
      fail: function (res) { },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  },
  search: function(e) {
    var keyword = e.detail.value;
    if (keyword == undefined || keyword == '') {
      wx.showToast({
        icon: 'none',
        title: '请输入搜索内容',
        duration: 2000
      })
    } else {
      this.getTest(keyword);
    }
  },
  quickSearch: function(e){
    var keyword = e.currentTarget.dataset.keyword;
    this.getTest(keyword);
  },
  toDetails: function (e) {
    var test_id = e.currentTarget.dataset.test_id;
    wx.navigateTo({
      url: "/pages/details/details?test_id=" + test_id
    })
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