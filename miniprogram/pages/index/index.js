const db = wx.cloud.database();
const {
  showLogin
} = require('../../utils/showLogin.js')
Page({
  data: {
    baseInfo: {
      bgImage: '',
      boyName: '男生昵称',
      girlName: '女生昵称',
      intimacy: '0',
      painDay: '',
      together: '',
      userID: '',
    },
    day: '0',
  },

  onShow() {
    let baseInfo = wx.getStorageSync('baseInfo') || {};
    this.setData({
      baseInfo
    })
  },

  goWhisper: function () {
    if (!this.data.baseInfo.userID) {
      showLogin();
    } else {
      wx.navigateTo({
        url: '',
      })
    }
  },

  goMemory: function () {
    if (!this.data.baseInfo.userID) {
      showLogin();
    } else {
      wx.navigateTo({
        url: '',
      })
    }
  },

  goTimeLine: function () {
    if (!this.data.baseInfo.userID) {
      showLogin();
    } else {
      wx.navigateTo({
        url: '',
      })
    }
  }
});