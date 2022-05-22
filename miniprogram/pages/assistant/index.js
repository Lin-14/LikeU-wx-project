const db = wx.cloud.database();
const { showLogin } = require('../../utils/showLogin.js')
Page({
  data: {
    lastTime: "未设置",
    nextTime: "未设置",
    date: "未设置",
    userID: '',
  },
  onLoad: function() {
    const { painDay, userID } = wx.getStorageSync('baseInfo') || '';
    if(painDay) {
      this.setData({
        lastTime: painDay
      }, this.getNextDay(painDay))
    }
    if(userID) {
      this.setData({
        userID,
      })
    }
  },
  // 选择时间
  bindDateChange: function(e) {
    this.setData({
      lastTime: e.detail.value
    },this.getNextDay(e.detail.value));
    // 未登录提示框
    if(!this.data.userID) {
      showLogin();
    } else {
      // 更新数据
      db.collection('baseInfo')
        .where({
          userID: this.data.userID
        })
        .update({
          data: {
            painDay: e.detail.value
          }
        })
    }
    
  },
  getNextDay: function(day) {
    let time = new Date(day).getTime() + 2332800000;
    console.log(time);
    let T = new Date(time);
    let res = `${T.getFullYear()}-${T.getMonth()+1}-${T.getDate()}`
    this.setData({
      nextTime: res
    })
  },

});
