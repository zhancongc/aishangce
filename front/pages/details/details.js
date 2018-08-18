// pages/details/details.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    test: {},
    title: '',
    intro: '',
    title_display: true,
    question_number: 0,
    question_title: '',
    question_options: [],
    question_next: [],
    question_display: false,
    question_set: [],
  },
  startTest : function (e) {
    this.setData({
      title_display : false,
      share: '',
      question_set: [],
      question_number: this.data.test.question[0].id + 1,
      question_title: this.data.test.question[0].title,
      question_options: this.data.test.question[0].options,
      question_next: this.data.test.question[0].next
    })
  },
  previous: function previous(question_id){
    var temp = this.data.question_number - 1;
    var arr = this.data.question_set.pop();
    console.log('question_set', this.data.question_set);
    this.setData({
      question_number: this.data.test.question[question_id].id + 1,
      question_title: this.data.test.question[question_id].title,
      question_options: this.data.test.question[question_id].options,
      question_next: this.data.test.question[question_id].next
    })
  },
  next: function next(question_id, option_id){
    var temp = this.data.question_number-1;
    var temp_set = {question_id:temp, option_id:option_id};
    var arr = this.data.question_set.push(temp_set);
    console.log('question_set', this.data.question_set);
    this.setData({
      question_number: this.data.test.question[question_id].id + 1,
      question_title: this.data.test.question[question_id].title,
      question_options: this.data.test.question[question_id].options,
      question_next: this.data.test.question[question_id].next
    })
  },
  result: function result(question_id){
    var type = parseInt(Math.abs(question_id))-1;
    this.setData({
      title_display: true,
      question_display: false,
      question_number: question_id,
      share: 'share',
      title: this.data.test.result[type].title,
      intro: this.data.test.result[type].content
    })
  },
  nextQuestion: function (e) {
    var question = this.data.test.question;
    var options = question[this.data.question_number-1].options;
    var option_id = options.indexOf(e.currentTarget.dataset.option);
    var question_id = question[this.data.question_number - 1].next[option_id];
    if (question_id > 0){
      this.next(question_id, option_id);
    } else {
      this.result(question_id, option_id);
    }
    console.log('下一题堆栈', this.data.question_set);
  },
  previousQuestion : function (){
    console.log('上一题堆栈', this.data.question_set);
    if(this.data.question_set!=''){
      var index = this.data.question_set.length - 1;
      console.log('index'+index);
      this.previous(this.data.question_set[index].question_id)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.testid);
    if(app.globalData.cards==''){
      wx.showLoading({
        title: '加载中',
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      that.setData({
        loaded: false
      })
      wx.request({
        url: 'https://wx.bestbwzs.com/test',
        method: 'POST',
        data: {'test_id': options.testid},
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.id == -1) {
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
          } else {
            that.setData({
              cards: res.data,
              loaded: true,
              title: res.data.title,
              intro: res.data.intro
            })
            wx.setNavigationBarTitle({
              title: res.data.title
            })
          }
        },
        fail: function (res) {
          console.log("fail");
          console.log(res.data)
        },
        complete: function (res) {
          console.log("complete");
          console.log(res.data);
          wx.hideLoading();
        }
      })
    } else {
      for (var i = 0; i < app.globalData.cards.length; i++) {
        if (app.globalData.cards[i].id == options.testid) {
          that.setData({
            test: app.globalData.cards[i]
          })
        }
      }
      that.setData({
        title: that.data.test.title,
        intro: that.data.test.intro
      })
      wx.setNavigationBarTitle({
        title: that.data.test.title
      })
    }
    /*app.AppMusic.seek(60);
    app.AppMusic.src = 'http://bestbwzs.com/music/%E5%AE%97%E6%AC%A1%E9%83%8E%20-%20%E3%81%84%E3%81%A4%E3%82%82%E4%BD%95%E5%BA%A6%E3%81%A7%E3%82%82.mp3';
    app.AppMusic.play();*/
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
    /*app.AppMusic.pause();*/
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
    return {
      title: this.data.test.title,
      path: 'pages/details/details?testid='+this.data.test.id,
      success: (res) => {},
      fail: (res) => {}
    }
  }
})