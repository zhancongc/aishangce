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
    startbotton: '开始测试',
    question_number: 0,
    question_title: '',
    question_options: [],
    question_next: [],
    question_display: false,
    question_set: []
  },
  startTest : function (e) {
    this.setData({
      title_display : false,
      question_display: true,
      question_number: this.data.test.question[0].id + 1,
      question_title: this.data.test.question[0].title,
      question_options: this.data.test.question[0].options,
      question_next: this.data.test.question[0].next
    })
  },
  next: function next(question_id){
    var temp = this.data.question_number;
    console.log('question_set' + typeof(this.data.question_set));
    var arr = this.data.question_set.push(temp);
    this.setData({
      questions: arr,
      question_number: this.data.test.question[question_id].id + 1,
      question_title: this.data.test.question[question_id].title,
      question_options: this.data.test.question[question_id].options,
      question_next: this.data.test.question[question_id].next
    })
  },
  result: function result(question_id){
    var type = parseInt(Math.abs(question_id))-1;
    console.log('type'+type);
    this.setData({
      title_display: true,
      question_display: false,
      question_number: 0,
      startbotton: '再测一遍',
      title: this.data.test.result[type].title,
      intro: this.data.test.result[type].content
    })
  },
  nextQuestion: function (e) {
    console.log('question_set' + this.data.question_set);
    var question = this.data.test.question;
    var options = question[this.data.question_number-1].options;
    var option_id = options.indexOf(e.currentTarget.dataset.option);
    var question_id = question[this.data.question_number - 1].next[option_id];
    console.log('question_id'+question_id);
    if (question_id > 0){
      this.next(question_id);
    } else {
      this.result(question_id);
    }
  },
  previousQuestion : function (){
    this.next(this.data.questions[this.data.questions.length-1])
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      test: app.globalData.cards[options.testid]
    })
    that.setData({
      title: that.data.test.title,
      intro: that.data.test.intro
    })
    wx.setNavigationBarTitle({
      title: that.data.test.title
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