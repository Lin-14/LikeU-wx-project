const {
  showLogin
} = require('../../utils/showLogin.js')
Page({
  data: {
    name: '',
    avatarUrl: '../../images/base/default.png',
    userID: '',
  },

  onLoad() {
    let name = wx.getStorageSync('name');
    if(name) {
      this.setData({ name })
    }
    let avatarUrl = wx.getStorageSync('avatarUrl');
    if(avatarUrl) {
      this.setData({ avatarUrl })
    }
    let userID = wx.getStorageSync('userID');
    if (userID) {
      this.setData({ userID })
    }
  },
  goEdit() {
    if(!this.data.userID) {
      showLogin();
    } else {
      wx.navigateTo({
        url: '/pages/edit/index'
      })
    }
  },
  goChangeBg() {
    if(!this.data.userID) {
      showLogin();
    } else {
      wx.navigateTo({
        url: '/pages/uploadFile/index'
      })
    }
  },

  onChooseAvatar(e) { // 选择头像
    const {
      avatarUrl
    } = e.detail
    this.setData({ avatarUrl })
    wx.setStorageSync('avatarUrl', avatarUrl)
  },

  onInput(e) {
    console.log(e);
    wx.setStorageSync('name', e.detail.value)
  },
  
});