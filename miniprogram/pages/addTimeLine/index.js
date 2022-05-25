const db = wx.cloud.database();
Page({
  data: {
    userID: '',
    title: '',
    content: '',
    image: '',
    date: '',
  },

  onLoad(options) {
    let userID = wx.getStorageSync('userID');
    this.setData({
      userID
    });
    let T = new Date();
    let date = `${T.getFullYear()}-${T.getMonth() + 1}-${T.getDate()}`;
    this.setData({
      date
    });
  },

  bindDateChange(e) { // 日期选择
    this.setData({
      date: e.detail.value
    })
  },
  uploadImg() { // 上传图片
    wx.chooseImage({
      count: 1,
      success: chooseResult => {
        wx.showLoading({
          title: '上传中'
        });
        const name = new Date().getTime();
        wx.cloud.uploadFile({
          cloudPath: `${name}-timeLine.png`,
          filePath: chooseResult.tempFilePaths[0]
        }).then(res => {
          wx.showToast({
            title: '上传成功'
          });
          this.setData({
            image: res.fileID
          });
          wx.hideLoading();
        }).catch((e) => {
          console.log(e);
          wx.hideLoading();
        });
      },
    });
  },
  save() { // 提交
    if (!this.data.content || !this.data.title || !this.data.image) {
      wx.showToast({
        icon: 'none',
        title: '请填写完整信息'
      })
      return;
    }
    wx.showLoading({
      title: '提交中'
    });
    db.collection('timeLine')
      .add({
        data: {
          userID: this.data.userID,
          title: this.data.title,
          content: this.data.content,
          image: this.data.image,
          date: this.data.date,
        },
        success: (res) => {
          wx.hideLoading();
          wx.showToast({
            title: '提交成功'
          });
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          }, 1000)
        }
      })
  },

  onInput() {},
})