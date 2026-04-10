// pages/test/test.js
const app = getApp();
const { initQuestions, getVisibleQuestions, computeResult } = require('../../utils/compute.js');

// 选项编码 A/B/C/D
const CODES = ['A', 'B', 'C', 'D'];

/**
 * 给题目列表附加 codedOptions，供 WXML 渲染
 */
function attachCodes(questions) {
  return questions.map(q => ({
    ...q,
    codedOptions: q.options.map((opt, i) => ({
      ...opt,
      code: CODES[i] || String(i + 1)
    }))
  }));
}

Page({
  data: {
    questions: [],
    answers: {},
    progress: 0,
    progressText: '0 / 30',
    canSubmit: false,
    hintText: '全选完才会放行。世界已经够乱了，起码把题做完整。'
  },

  onLoad() {
    const shuffled = initQuestions();
    app.globalData.shuffledQuestions = shuffled;
    this.setData({ questions: attachCodes(shuffled) });
    this.updateProgress();
  },

  /** 选项变更 */
  onOptionChange(e) {
    const { questionId, value } = e.currentTarget.dataset;
    const answers = { ...this.data.answers, [questionId]: value };

    // 饮酒门控题：切换时清除后续题答案并重新渲染
    if (questionId === 'drink_gate_q1') {
      if (value !== 3) {
        delete answers['drink_gate_q2'];
      }
      app.globalData.answers = answers;
      this.setData({ answers });
      const visible = getVisibleQuestions(app.globalData.shuffledQuestions, answers);
      this.setData({ questions: attachCodes(visible) });
      this.updateProgress();
      return;
    }

    app.globalData.answers = answers;
    this.setData({ answers });
    this.updateProgress();
  },

  /** 更新进度 */
  updateProgress() {
    const visible = getVisibleQuestions(app.globalData.shuffledQuestions, this.data.answers);
    const total = visible.length;
    const done = visible.filter(q => this.data.answers[q.id] !== undefined).length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    const complete = done === total && total > 0;

    this.setData({
      questions: attachCodes(visible),
      progress: percent,
      progressText: `${done} / ${total}`,
      canSubmit: complete,
      hintText: complete
        ? '都做完了。现在可以把你的电子魂魄交给结果页审判。'
        : '全选完才会放行。世界已经够乱了，起码把题做完整。'
    });
  },

  /** 提交 */
  onSubmit() {
    if (!this.data.canSubmit) return;

    wx.showLoading({ title: '计算中...' });
    const result = computeResult(this.data.answers);
    app.globalData.result = result;
    wx.hideLoading();

    wx.navigateTo({
      url: '/pages/result/result'
    });
  },

  /** 返回首页 */
  onBackIntro() {
    wx.navigateBack();
  }
});
