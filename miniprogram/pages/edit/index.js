const db = wx.cloud.database();
Page({
  data: {
    userID: '',
    date: '',
    together: '',
    girlName: '',
    boyName: '',
  },

  onLoad(options) {
    let userID = wx.getStorageSync('userID');
    this.setData({
      userID
    });
    this.getInfo();
  },

  onShow() {
    const {
      together,
      girlName,
      boyName
    } = wx.getStorageSync('baseInfo');
    this.setData({
      together,
      boyName,
      girlName
    });
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

  bindDateChange(e) { // 日期选择
    this.setData({
      together: e.detail.value
    })
  },

  save() { // 保存
    wx.showLoading();
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
          wx.hideLoading();
          wx.showToast({
            title: '保存成功'
          });
          this.getInfo();
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          },1000)
        }
      })
  },
  onInput() {},
})