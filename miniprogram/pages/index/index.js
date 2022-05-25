const db = wx.cloud.database();
const _ = db.command;
const showLogin = require('../../utils/showLogin.js')
Page({
  data: {
    baseInfo: {
      bgImage: '',
      boyName: '男生昵称',
      girlName: '女生昵称',
      intimacy: 0,
      painDay: '',
      together: '',
      userID: '',
    },
    day: '0',
    bgImage: '',
  },
  onLoad() {
    let baseInfo = wx.getStorageSync('baseInfo') || {};
    this.setData({
      baseInfo
    }, this.getDay);
    // 设置背景图
    if (baseInfo.bgImage) {
      this.setData({
        bgImage: baseInfo.bgImage
      })
    }
    let userID = wx.getStorageSync('userID');
    // 增加亲密度
    if (userID) {
      db.collection('baseInfo')
        .where({
          userID,
        })
        .update({
          data: {
            intimacy: _.inc(1),
          },
          success: res => {}
        })
    }
    // 获取账户最新信息
    db.collection('baseInfo')
      .where({
        userID,
      })
      .get({
        success: (res) => {
          let _res = res.data[0];
          if (!_res) return;
          this.setData({
            baseInfo: _res,
          })
          if (_res.bgImage) {
            this.setData({
              bgImage: _res.bgImage
            })
          }
          wx.setStorageSync('baseInfo', _res)
        }
      })
  },

  onShow() {
    let baseInfo = wx.getStorageSync('baseInfo') || {};
    this.setData({
      baseInfo
    }, this.getDay);
    // 设置背景图
    if (baseInfo.bgImage) {
      this.setData({
        bgImage: baseInfo.bgImage
      })
    }
  },

  goWhisper: function () { // 碎碎念
    if (!this.data.baseInfo.userID) {
      showLogin();
    } else {
      wx.navigateTo({
        url: '/pages/whisper/index',
      })
    }
  },

  goMemory: function () { // 纪念日
    if (!this.data.baseInfo.userID) {
      showLogin();
    } else {
      wx.navigateTo({
        url: '/pages/memory/index',
      })
    }
  },

  goTimeLine: function () { // 时光机
    if (!this.data.baseInfo.userID) {
      showLogin();
    } else {
      wx.navigateTo({
        url: '/pages/timeLine/index',
      })
    }
  },

  getDay() {
    if (!this.data.baseInfo.together) return;
    let date = this.data.baseInfo.together.replace(/-/g, "/");
    let time = new Date() - new Date(date);
    let day = Math.ceil(time / 1000 / 60 / 60 / 24);
    this.setData({
      day
    });
  }
});