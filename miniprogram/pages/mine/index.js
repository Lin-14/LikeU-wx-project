const db = wx.cloud.database();
const {
  showLogin
} = require('../../utils/showLogin.js')
Page({
  data: {
    name: '',
    avatarUrl: '../../images/base/default.png',
    userID: '',
    together: '',
    boyName: '',
    girlName: '',
    tourist: false,
  },

  onLoad() {
    let obj = wx.getStorageSync('user');
    const userID = wx.getStorageSync('userID');
    if (userID) {
      this.setData({
        userID,
      })
      this.getInfo();
    } else {
      this.setData({
        tourist: true
      })
    }
    if (obj.name) {
      this.setData({
        name: obj.name
      })
    }
    if (obj.avatarUrl) {
      this.setData({
        avatarUrl: obj.avatarUrl
      })
    }
  },
  getInfo() { // 根据本地存储的账号id查信息
    db.collection('baseInfo')
      .where({
        userID: this.data.userID,
      })
      .get({
        success: (res) => {
          let _res = res.data[0];
          if (!_res) return;
          this.setData({
            baseInfo: _res,
          }, function () {
            const {
              together,
              boyName,
              girlName
            } = _res;
            this.setData({
              together,
              boyName,
              girlName
            })
          })
          wx.setStorageSync('baseInfo', _res)
        }
      })
  },

  onChooseAvatar(e) { // 选择头像
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
    wx.setStorageSync()
  },

  onInput(e) {},
  bindDateChange(e) { // 日期选择
    this.setData({
      together: e.detail.value
    })
  },

  save: function () { // 保存
    let user = {
      name: this.data.name,
      avatarUrl: this.data.avatarUrl,
    }
    wx.setStorageSync('user', user);
    if (!this.data.userID) {
      showLogin();
    }
    db.collection('baseInfo')
      .where({
        userID: this.data.userID
      })
      .update({
        data: {
          together: this.data.together,
          boyName: this.data.boyName,
          girlName: this.data.girlName
        },
        success: res => {
          wx.showToast({
            title: '保存成功'
          });
          this.getInfo();
        }
      })
  },

  toLogin() {
    wx.navigateTo({
      url: '/pages/login/index'
    })
  },
});