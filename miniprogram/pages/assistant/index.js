const db = wx.cloud.database();
const {
  showLogin
} = require('../../utils/showLogin.js')
Page({
  data: {
    lastTime: "未设置",
    nextTime: "未设置",
    date: "未设置",
    userID: '',
    bgImage: '../../images/bgImage/bgImage.jpeg',
  },
  onShow: function () {
    const {
      painDay,
      userID,
      bgImage
    } = wx.getStorageSync('baseInfo') || '';
    if (painDay) {
      this.setData({
        lastTime: painDay
      }, this.getNextDay(painDay))
    }
    if (userID) {
      this.setData({
        userID,
      })
    }
    if (bgImage) {
      this.setData({
        bgImage,
      })
    }
  },
  // 选择时间
  bindDateChange: function (e) {
    this.setData({
      lastTime: e.detail.value
    }, this.getNextDay(e.detail.value));
    // 未登录提示框
    if (!this.data.userID) {
      showLogin();
    } else {
      // 更新数据
      wx.showLoading();
      db.collection('baseInfo')
        .where({
          userID: this.data.userID
        })
        .update({
          data: {
            painDay: e.detail.value
          },
          success: res => {
            wx.hideLoading();
            wx.showToast({
              title: '设置成功'
            });
          }
        })
    }

  },
  getNextDay: function (day) {
    let time = new Date(day).getTime() + 2332800000;
    let T = new Date(time);
    let res = `${T.getFullYear()}-${T.getMonth()+1}-${T.getDate()}`
    this.setData({
      nextTime: res
    })
  },

});