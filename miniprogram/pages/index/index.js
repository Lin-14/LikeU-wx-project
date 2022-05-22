const db = wx.cloud.database();
const { showLogin } = require('../../utils/showLogin.js')
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

  onLoad() {
    let obj = wx.getStorageSync('baseInfo') || {};
    if (Object.keys(obj).length == 0) return;
    this.getInfo();
  },

  getInfo: function () {
    // 根据本地存储的账号id查信息
    db.collection('baseInfo')
      .where({
        userID: obj.userID
      })
      .get({
        success: (res) => {
          let _res = res.data[0];
          this.setData({
            baseInfo: _res,
          }, function () {
            let time = Date.now() - new Date(_res.together);
            let _day = Math.round(time / 1000 / 60 / 60 / 24);
            this.setData({
              day: _day
            })
          })
          console.log(this.baseInfo);
        }
      })
  },

  goWhisper: function() {
    if(!this.data.baseInfo.userID) {
      showLogin();
    } else {
      wx.navigateTo({
        url: '',
      })
    }
  },

  goMemory: function() {
    if(!this.data.baseInfo.userID) {
      showLogin();
    } else {
      wx.navigateTo({
        url: '',
      })
    }
  },

  goTimeLine: function() {
    if(!this.data.baseInfo.userID) {
      showLogin();
    } else {
      wx.navigateTo({
        url: '',
      })
    }
  }
});