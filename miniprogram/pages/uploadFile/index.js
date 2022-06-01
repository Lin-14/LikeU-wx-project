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
    // 让用户选择一张图片
    wx.chooseImage({
      count: 1,
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.showLoading({
          title: '上传中'
        });
        const name = new Date().getTime();
        wx.cloud.uploadFile({
          cloudPath: `${name}-bg.png`,
          filePath: chooseResult.tempFilePaths[0]
        }).then(res => {
          wx.showToast({
            title: '上传成功'
          });
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
                  title: '新壁纸设置成功'
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
    // 下载图片
    wx.cloud.downloadFile({
      fileID: res,
      success(res) {
        // 转换图片格式为base64
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            // 保存本地
            let bgImage = wx.getStorageSync('bgImage');
            bgImage = 'data:image/png;base64,' + res.data;
            wx.setStorageSync('bgImage', bgImage);
          }
        })
      }
    })
  },
});