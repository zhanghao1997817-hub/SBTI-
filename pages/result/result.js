// pages/result/result.js
const app = getApp();
const { dimensionMeta, DIM_EXPLANATIONS, dimensionOrder } = require('../../utils/compute.js');

Page({
  data: {
    result: null,
    typeCode: '',
    typeCn: '',
    typeIntro: '',
    typeDesc: '',
    modeKicker: '',
    badge: '',
    sub: '',
    image: '',
    dimList: [],
    funNote: '本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。你可以笑，但别太当真。'
  },

  onLoad() {
    const result = app.globalData.result;
    if (!result) {
      wx.redirectTo({ url: '/pages/index/index' });
      return;
    }

    const type = result.finalType;
    const dimList = dimensionOrder.map(dim => ({
      key: dim,
      name: dimensionMeta[dim].name,
      level: result.levels[dim],
      score: result.rawScores[dim],
      explanation: DIM_EXPLANATIONS[dim][result.levels[dim]]
    }));

    this.setData({
      result,
      typeCode: type.code,
      typeCn: type.cn,
      typeIntro: type.intro,
      typeDesc: type.desc,
      modeKicker: result.modeKicker,
      badge: result.badge,
      sub: result.sub,
      image: result.image,
      dimList,
      funNote: result.special
        ? '本测试仅供娱乐。隐藏人格和傻乐兜底都属于作者故意埋的损招，请勿把它当成医学、心理学、相学、命理学或灵异学依据。'
        : '本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。你可以笑，但别太当真。'
    });
  },

  /** 重新测试 */
  onRestart() {
    app.globalData.answers = {};
    app.globalData.shuffledQuestions = [];
    app.globalData.result = null;
    wx.redirectTo({
      url: '/pages/test/test'
    });
  },

  /** 回到首页 */
  onToHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    });
  },

  /** 分享 */
  onShareAppMessage() {
    return {
      title: `我的SBTI人格是${this.data.typeCode}（${this.data.typeCn}）！快来测测你的~`,
      path: '/pages/index/index'
    };
  }
});
