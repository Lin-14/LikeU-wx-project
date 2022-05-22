const db = wx.cloud.database();
const { showLogin } = require('../../utils/showLogin.js')
Page({
  data: {
    name: '',
    avatarUrl: '../../images/base/default.png',
    userID: '',
  },

  onLoad() {
    let obj = wx.getStorageSync('user');
    const { userID } = wx.getStorageSync('baseInfo');
    this.setData({
      userID,
    })
    if(obj.name) {
      this.setData({
        name: obj.name
      })
    }
    if(obj.avatarUrl) {
      this.setData({
        avatarUrl: obj.avatarUrl
      })
    }
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
    
  },

  save: function() {
    let user = {
      name: this.data.name,
      avatarUrl: this.data.avatarUrl,
    }
    if(!this.data.userID) {
      showLogin();
    }
    wx.setStorageSync('user', user);
    db.collection('baseInfo')
  },
});