// pages/index/index.js
const app = getApp();

Page({
  data: {},

  onLoad() {
    // 每次进入首页重置状态
    app.globalData.answers = {};
    app.globalData.shuffledQuestions = [];
    app.globalData.result = null;
  },

  onStartTest() {
    wx.navigateTo({
      url: '/pages/test/test'
    });
  }
});
