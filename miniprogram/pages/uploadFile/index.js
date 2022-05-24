const db = wx.cloud.database();
Page({
  data: {
    haveGetImgSrc: false,
    imgSrc: '',
    userID: '',
  },

  onLoad(options) {
    let userID = wx.getStorageSync('userID');
    this.setData({
      userID
    })
  },

  uploadImg() {
    wx.showLoading();
    // 让用户选择一张图片
    wx.chooseImage({
      count: 1,
      success: chooseResult => {
        // 将图片上传至云存储空间
        const name = new Date().getTime();
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: `${name}-bg.png`,
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0]
        }).then(res => {
          console.log(res.fileID);
          this.setData({
            haveGetImgSrc: true,
            imgSrc: res.fileID
          }, this.updataBg(res.fileID));
          // 更新壁纸
          db.collection('baseInfo')
            .where({
              userID: this.data.userID
            })
            .update({
              data: {
                bgImage: res.fileID
              },
              success: res => {
                wx.showToast({
                  title: '设置成功'
                });
              }
            })
          wx.hideLoading();
        }).catch((e) => {
          console.log(e);
          wx.hideLoading();
        });
      },
    });
  },

  clearImgSrc() {
    this.setData({
      haveGetImgSrc: false,
      imgSrc: ''
    });
  },

  updataBg(res) {
    // 更改本地
    console.log('更改本地数据');
    let baseInfo = wx.getStorageSync('baseInfo');
    baseInfo.bgImage = res;
    wx.setStorageSync('baseInfo', baseInfo);
  }
});