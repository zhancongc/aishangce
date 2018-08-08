//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cards: [{
      id: 0,
      image: '/images/castle.jpg',
      title: '你是哪种动物恋人',
      intro: "动物好多种，恋爱的你到底是哪一种？"
    }, {
      id: 1,
      image: '/images/san_francisco.jpg',
      title: '大桥',
      intro: '著名的旧金山港湾大桥'
    }, {
      id: 2,
      image: '/images/cornfield.jpg',
      title: '麦田',
      intro: '西欧一望无际的麦田'
    }, {
      id: 3,
      image: '/images/island.jpg',
      title: '岛屿',
      intro: '马尔代夫的岛屿风光'
    }]
  },
  //事件处理函数
  toDetails: function (e) {
    var testid = e.currentTarget.dataset.testid;
    wx.navigateTo({
      url: "/pages/details/details?testid=" + testid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var test = {
      id: 1,
      image: '/images/castle.jpg',
      title: "你是哪种动物恋人",
      intro: '动物好多种，恋爱中的你到底是哪一种？',
      content: '动物好多种，恋爱中的你到底是哪一种？快来测一测吧。',
      questions: [
        {
          id: 0,
          title: '遇到了心动的ta，你会',
          options: [
            '默默观察ta的喜好，时机成熟便会行动',
            '向别人收集关于ta的信息，询问意见，制造合适的机会',
            '主动靠近，对他嘘寒问暖，想把一切最好的都给ta',
            '幻想和ta在一起，但见到ta又不知所措']
        }, {
          id: 1,
          title: '周末，你和恋人一般会',
          options: [
            '会提前和恋人讨论怎么度过',
            '喜欢和恋人一起安静地过二人世界',
            '约会！约会！跟恋人一起吃喝玩乐！',
            '大多数时候想一个人待着，但也有突然想黏着恋人的时候']
        }, {
          id: 2,
          title: '当恋人介绍ta的朋友给你认识',
          options: [
            '和新朋友保持距离，不会走得太近',
            '感到好紧张',
            '好开心，又有新朋友啦',
            '比较怕生，在熟悉起来之前都要有恋人陪同']
        }, {
          id: 3,
          title: '当看到恋人和异性聊得很高兴时',
          options: [
            '尝试加入聊天，实则暗中观察',
            '有种被抛弃的感觉',
            '感到嫉妒，有点生气地喊ta，让ta回到你的身边',
            '不打扰他们，纯粹觉得他们聊得来']
        }, {
          id: 4,
          title: '争吵时，如果对方先道歉',
          options: [
            '后悔没有比恋人先道歉，这其实对自己来说并不是一件难事',
            '其实心里已经不生气了，但不好意思直接表露出来',
            '问ta，你到底错在哪里了',
            '无论多生气，都会马上心软了']
        }, {
          id: 5,
          title: '恋人伤心的时候',
          options: [
            '在想自己能做些什么可以帮到ta的',
            '拥抱ta，说一些安慰、暖心的话',
            '不会说太多的话，在必要的时候提供无声的帮助',
            '想说点什么安慰ta，但总找不到合适的话语']
        }, {
          id: 6,
          title: '你理想的约会地点是',
          options: [
            '气氛浪漫，适合情侣去的地方（沙滩、摩天轮等）',
            '户外活动（爬山、野餐、踏青等）',
            '两个人在家里度过',
            '时尚潮流的地方']
        }, {
          id: 7,
          title: '你伤心的时候会',
          options: [
            '在恋人的陪伴下，让自己短暂沉溺在伤痛中',
            '一个人疗伤，不希望恋人看到自己失落的样子',
            '藏不住委屈，会一个劲地跟恋人诉苦',
            '不会让事情影响自己太久，很快就会恢复过来']
        }, {
          id: 8,
          title: '你最喜欢看的电影是',
          options: [
            '动作悬疑类（谍影重重，007）',
            '犯罪推理类（福尔摩斯，金田一）',
            '喜剧类（三个白痴，家有喜事）',
            '温馨感人类（小森林，忠犬八公）']
        }, {
          id: 9,
          title: '面对爱情，你最认可的态度是',
          options: [
            '明白自己想要的是什么，面对爱情不会犹豫',
            '双方都有自己的空间，一起过着细水长流的日子',
            '爱时张扬热情，不爱时，该断则断',
            '彼此坦诚包容，又相对独立']
        }]
    }
    app.globalData.cards = [test, test, test, test];
    for(var i=0;i<4; i++){
      app.globalData.cards[i].id=i;
      console.log(app.globalData.cards[i]);
    }
    console.log(app.globalData.cards);
    var that = this;
    that.setData({
      cards: app.globalData.cards
    })
  },
  getData : function () {
    var that = this;
    wx.request({
      url: "https://wx.bestbwzs.com/",
      data: {
        request: ""
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
      complete: function () {}
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

