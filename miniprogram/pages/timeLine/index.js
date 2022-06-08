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

  // getDataList() {
  //   db.collection('timeLine')
  //     .where({
  //       userID: this.data.userID,
  //     })
  //     .get({
  //       success: (res) => {
  //         let _res = res.data;
  //         if (_res.length == 0) return;
  //         this.setData({
  //           dataList: _res,
  //         })
  //       }
  //     })
  // },

  async getDataList() {
    // 先取出集合记录总数
    const countResult = await db.collection('timeLine')
      .where({
        userID: this.data.userID,
      })
      .count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / 20)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('timeLine')
        .where({
          userID: this.data.userID,
        })
        .skip(i * 20)
        .limit(20)
        .get()
      tasks.push(promise)
    }
    // 将所有结果保存到数组
    let res = [];
    (await Promise.all(tasks)).forEach((item) => {
      res = res.concat(item.data);
    })
    this.setData({
      dataList: res
    })
  }
})