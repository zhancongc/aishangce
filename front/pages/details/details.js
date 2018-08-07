// pages/details/details.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    giftCards: [],
    image: "/images/desert.jpg"
  },
  chooseCard : function (e) {
    var id = e.target.dataset.index;
    console.log(id);
    for (var item = 0; item < this.data.giftCards.length; item++) {
      if (item == id) {
        this.data.giftCards[item].active = this.data.giftCards[item].active == true ? false : true;
      } else {
        this.data.giftCards[item].active = false;
      }
    }
    var image = "";
    for(var i=0; i < this.data.giftCards.length; i++){
      console.log(i);
      if(this.data.giftCards[i].active === true) {
        image = this.data.giftCards[i].imageUri;
        break;
      }
    }
    if(image === "")
      image = "/images/tooopen_sy_175866434296.jpg"
    console.log(image,this.data.giftCards);
    this.setData({
      giftCards: this.data.giftCards,
      image: image
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.cardid;
    console.log("card id is "+id);
    this.data.giftCards = app.globalData.cards;
    this.data.giftCards[id].active = true;
    this.setData({
      giftCards: this.data.giftCards,
      image: this.data.giftCards[id].imageUri
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