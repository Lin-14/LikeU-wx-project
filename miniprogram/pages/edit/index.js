// pages/edit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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
})