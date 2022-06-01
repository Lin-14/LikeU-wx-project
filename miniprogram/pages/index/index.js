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
    bgImage: '../../images/bgImage/bgImage.jpeg',
  },
  onLoad() {
    let baseInfo = wx.getStorageSync('baseInfo') || {};
    this.setData({
      baseInfo
    }, this.getDay);
    // 设置背景图
    let bg = wx.getStorageSync('bgImage');
    if (bg) {
      this.setData({
        bgImage: bg
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
          wx.setStorageSync('baseInfo', _res);
        }
      })
    // 如有更新则更新本地背景图
    wx.cloud.downloadFile({
      fileID: baseInfo.bgImage,
      success: res => {
        // 转换图片格式为base64
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePath,
          encoding: 'base64',
          success: res => {
            let bgImage = wx.getStorageSync('bgImage');
            bgImage = 'data:image/png;base64,' + res.data;
            wx.setStorageSync('bgImage', bgImage);
            this.setData({
              bgImage
            })
          }
        })
      }
    })
  },

  onShow() {
    let baseInfo = wx.getStorageSync('baseInfo') || {};
    this.setData({
      baseInfo
    }, this.getDay);
    // 设置背景图
    let bg = wx.getStorageSync('bgImage');
    if (bg) {
      this.setData({
        bgImage: bg
      })
    }
  },

  onShareAppMessage() {
    return {
      title: "LikeU情侣恋爱日记",
      path: `/${getUrl.getCurrentPageUrlWithArgs()}`
    };
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