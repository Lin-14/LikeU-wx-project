const db = wx.cloud.database();
Page({
  data: {
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
  },

  goAdd() {
    wx.navigateTo({
      url: '/pages/addTimeLine/index'
    })
  },

  getDataList() {
    db.collection('timeLine')
      .where({
        userID: this.data.userID,
      })
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
})