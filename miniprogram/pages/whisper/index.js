const db = wx.cloud.database();
Page({
  data: {
    date: '',
    userID: '',
    dataList: [],
  },

  onLoad(options) {},

  onShow() {
    let userID = wx.getStorageSync('userID');
    this.setData({
      userID
    });
    this.getDataList();
    let T = new Date();
    let date = `${T.getFullYear()}-${T.getMonth() + 1}-${T.getDate()}`;
    this.setData({
      date
    });
  },

  addPopup() { // 弹窗
    wx.showModal({
      title: '添加',
      placeholderText: '请输入此刻的想法',
      editable: true,
      confirmText: '提交',
      confirmColor: '#ff69b4',
      success: res => {
        if (res.confirm) {
          this.setData({
            content: res.content
          }, this.save)
        } else {
          console.log('点击取消');
        }
      }
    })
  },

  getDataList() { // 获取列表
    db.collection('whisper')
      .where({
        userID: this.data.userID,
      })
      .orderBy('createTime', 'desc')
      .get({
        success: (res) => {
          let _res = res.data;
          if (_res.length == 0) return;
          this.setData({
            dataList: _res,
          })
        }
      })
  },
  save() {
    if (!this.data.content) {
      wx.showToast({
        icon: 'none',
        title: '内容为空'
      })
      return
    };
    wx.showLoading();
    db.collection('whisper')
      .add({
        data: {
          userID: this.data.userID,
          content: this.data.content,
          date: this.data.date,
          createTime: new Date()
        },
        success: (res) => {
          wx.hideLoading();
          wx.showToast({
            title: '提交成功'
          });
          this.getDataList();
        }
      })
  }
})