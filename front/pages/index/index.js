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
      id: 0,
      image: '/images/castle.jpg',
      title: '你在爱情中“受伤率”有多高',
      intro: '爱情中免不了受伤，你会是最容易受伤的哪个吗？',
      question: [{
        id: 0,
        title: '你觉得自己运气还不错？',
        image: '',
        options: [
          '是的',
          '不是',
          '还好'
        ],
        next: [
          '3',
          '2',
          '1'
        ]
      }, {
        id: 1,
        title: '有人借走你的东西，你会记得吗？',
        image: '',
        options: [
          '是的',
          '不是',
          '不确定'
        ],
        next: [
          '4',
          '3',
          '2'
        ]
      }, {
        id: 2,
        title: '你赞同爱情里的人都是盲目的吗？',
        image: '',
        options: [
          '是的',
          '不是',
          '不确定'
        ],
        next: [
          '5',
          '4',
          '3'
        ]
      }, {
        id: 3,
        title: '你的内心情感比较细腻？',
        image: '',
        options: [
          '是的',
          '不是',
          '还好'
        ],
        next: [
          '6',
          '5',
          '4'
        ]
      }, {
        id: 4,
        title: '你是一个强势的人吗？',
        image: '',
        options: [
          '是的',
          '不是',
          '还好'
        ],
        next: [
          '7',
          '6',
          '5'
        ]
      }, {
        id: 5,
        title: '你曾经暗恋过某个人吗？',
        image: '',
        options: [
          '是的，而且不止一个',
          '是的，只有一个',
          '不是'
        ],
        next: [
          '6',
          '7',
          '-1'
        ]
      }, {
        id: 6,
        title: '你对爱情有很高的期待或者要求？',
        image: '',
        options: [
          '是的',
          '不是',
          '不确定'
        ],
        next: [
          '8',
          '9',
          '7'
        ]
      }, {
        id: 7,
        title: '有人说过你很敏感？',
        image: '',
        options: [
          '是的',
          '不是',
          '还好'
        ],
        next: [
          '-1',
          '8',
          '9'
        ]
      }, {
        id: 8,
        title: '如果和恋人吵架了，你会：',
        image: '',
        options: [
          '争论对错',
          '冷战逃避',
          '求和示好'
        ],
        next: [
          '-1',
          '-2',
          '-3'
        ]
      }, {
        id: 9,
        title: '如果有人（不讨厌也不喜欢）跟你表白，你会：',
        image: '',
        options: [
          '答应对方',
          '考虑一下',
          '拒绝对方'
        ],
        next: [
          '-2',
          '-3',
          '-4'
        ]
      }],
      result: [{
        id: 0,
        title: '受伤率：90%',
        content: '你对于爱情有憧憬和期待，但是爱情中有甜蜜，也会有摩擦。两个不同的个体在一起，不可避免地会有磨合的事情，但是有时候你可能过于敏感，又或者过于执着于自己的态度，而忽略了对方，导致最后的结局往往并不好。为此，你会感到十分受伤。'
      }, {
        id: 1,
        title: '受伤率：70%',
        content: '你在关系中比较有可能会受伤，这可能源于你不太懂得如何去维护关系。你采取的方式对你来说是轻松的，但是对关系来说却未必是有益的，甚至可能会影响关系。如果不想在感情中受伤，你应该正视自己的内心，学会如何去爱，去表达。'
      }, {
        id: 2,
        title: '受伤率：50%',
        content: '你对于爱情抱有比较开放的态度，不会坚持一些固有的观念，而是会敢于尝试，主动迈出第一步。但是爱情有时候并不尽如人意，好在你也明白这一点，并不会强求，面对爱情中可能的伤害也比较看得开，更可能采取积极的方式来解决。'
      }, {
        id: 3,
        title: '受伤率：30%',
        content: '你的受伤率很低，但这来源于你不给对方机会，以此来切断自己受伤的可能。你对爱情可能有着比较消极的想法，不太想进入一段关系，面对爱情，常常是望而却步。然而这样的你，内心并不是真的强大，只是你用围墙把自己保护起来而已。'
      }]
    }
    app.globalData.cards.push(test);
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

