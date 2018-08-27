// pages/details/details.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    test: null,
    image: '',
    title: '',
    intro: '',
    question_number: 0,
    question_title: '',
    question_options: [],
    question_next: [],
    question_set: [],
    result_id: -1
  },
  startTest : function (e) {
    this.setData({
      share: '',
      question_set: [],
      question_number: this.data.test.question[0].id + 1,
      question_title: this.data.test.question[0].title,
      question_options: this.data.test.question[0].options,
      question_next: this.data.test.question[0].next
    })
  },
  previous: function (question_id){
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
  next: function (question_id, option_id){
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
  result: function (question_id){
    var that = this;
    var result_id = parseInt(Math.abs(question_id))-1;
    wx.showLoading({
      title: '正在获取您的测试结果',
    })
    wx.request({
      url: 'https://wx.bestbwzs.com/user',
      method: 'POST',
      data: {
        'openid': wx.getStorageSync("openid"),
        'test_id': that.data.test.id,
        'result_id': result_id
        },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.status == 0) {
          wx.showToast({
            title: '获取测试结果失败',
            icon: 'none',
            image: '',
            duration: 2000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else if (res.data.status == 1) {
          wx.showToast({
            title: '获取测试结果成功',
            icon: 'none',
            image: '',
            duration: 2000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          that.setData({
            share: 'share',
            result_id: result_id,
            question_number: question_id,
            image: that.data.test.image,
            title: that.data.test.result[result_id].title,
            intro: that.data.test.result[result_id].content
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
    that.setData({
      question_number: question_id,
      share: 'share',
      result_id: result_id,
      title: that.data.test.result[result_id].title,
      intro: that.data.test.result[result_id].content
    })
    wx.hideLoading();
    console.log('测试结果是：类型');
    console.log(this.data.result_id);
  },
  nextQuestion: function (e) {
    var question = this.data.test.question;
    var options = question[this.data.question_number-1].options;
    var option_id = options.indexOf(e.currentTarget.dataset.option);
    var question_id = question[this.data.question_number - 1].next[option_id];
    if (question_id > 0){
      this.next(question_id, option_id);
    } else {
      this.result(question_id);
    }
    console.log('下一题堆栈', this.data.question_set);
  },
  previousQuestion: function (){
    console.log('上一题堆栈', this.data.question_set);
    if(this.data.question_set!=''){
      var index = this.data.question_set.length - 1;
      console.log('index'+index);
      this.previous(this.data.question_set[index].question_id)
    }
  },
  loadTest: function (test_id, result_id) {
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
    console.log('正在向服务端发送数据请求');
    console.log('测试id是：'+test_id+'，类型id是：'+result_id)
    wx.request({
      url: 'https://wx.bestbwzs.com/test',
      method: 'POST',
      data: { 'test_id': test_id },
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
          console.log('从服务端获取数据成功');
          if(result_id>=0) {
            console.log('显示测试结果');
            that.setData({
              test: res.data,
              loaded: true,
              result_id: result_id,
              question_number: 0,
              image: res.data.image,
              title: res.data.result[result_id].title,
              intro: res.data.result[result_id].content
            })
          } else if (result_id==-1) {
            console.log('显示测试简介');
            that.setData({
              test: res.data,
              loaded: true,
              question_number: 0,
              image: res.data.image,
              title: res.data.title,
              intro: res.data.intro
            })
          }
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
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    console.log('正在分享您的测试结果，类型');
    console.log(this.data.result_id);
    return {
      title: this.data.test.title,
      path: 'pages/details/details?test_id=' + this.data.test.id +'&result_id='+this.data.result_id,
      success: (res) => { },
      fail: (res) => { }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('开始加载测试');
    var that = this;
    console.log('options.result_id');
    console.log(options.result_id);
    if(app.globalData.cards==''){
      console.log('本地没有数据，尝试从服务端获取测试数据');
      that.loadTest(options.test_id, options.result_id);
    } else {
      console.log('本地存在测试数据，尝试从本地获取测试数据');
      for (var i = 0; i < app.globalData.cards.length; i++) {
        if (app.globalData.cards[i].id == options.test_id) {
          that.setData({
            test: app.globalData.cards[i]
          })
        }
      }
      if(that.data.test==null){
        console.log('从本地获取数据失败，尝试从服务端获取测试数据');
        that.loadTest(options.test_id, options.result_id)
      } else {
        console.log('获取本地数据成功，测试加载完毕');
        console.log(that.data.test)
        if(options.result_id==undefined){
          that.setData({
            image: that.data.test.image,
            title: that.data.test.title,
            intro: that.data.test.intro
          })
        } else {
          that.setData({
            loaded: true,
            result_id: options.result_id,
            question_number: 0,
            image: that.data.test.image,
            title: that.data.test.result[options.result_id].title,
            intro: that.data.test.result[options.result_id].content
          })
        }
        wx.setNavigationBarTitle({
          title: that.data.test.title
        })
      }
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
    wx.setStorage({
      key: 'test',
      data: this.data.test,
    })
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
  
  }
})