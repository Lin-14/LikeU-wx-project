const db = wx.cloud.database();
Page({

  data: {
    userID: '',
    userPWD: '',
  },

  onLoad(options) {},

  onReady() {
    wx.setNavigationBarTitle({
      title: '注册登录'
    })
  },

  onShow() {},

  signIn() {
    // 查询账户是否存在
    wx.cloud.database().collection('userList').where({
      userID: this.data.userID,
    }).get({
      success: res => {
        let user = res.data[0];
        if (user != undefined) {
          wx.showToast({
            title: '该账户已注册',
          })
          return
        }
        // 不存在，可以注册账户
        wx.cloud.database().collection('userList').add({
          data: {
            userID: this.data.userID,
            userPWD: this.data.userPWD
          },
          success: res => {
            wx.showToast({
              icon: 'none',
              title: '注册成功，去填写信息',
            })
            db.collection('baseInfo').add({
              data: {
                userID: this.data.userID
              }
            })
            wx.setStorageSync('userID', this.data.userID)
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/mine/index',
              })
            }, 1000);
          }
        })
      }
    });
  },

  login() {
    wx.cloud.database().collection('userList').where({
      //先是查询用户名是否存在
      userID: this.data.userID
    }).get({
      success: res => {
        let user = res.data[0]
        if (!user) {
          wx.showToast({
            title: "请先注册",
          })
        }
        if (this.data.userPWD == user.userPWD && this.data.userID == user.userID) {
          wx.showToast({
            title: '登陆成功',
          });
          wx.setStorageSync('userID', this.data.userID)
          // 查询信息并保存
          db.collection('baseInfo')
            .where({
              userID: this.data.userID
            })
            .get({
              success: (res) => {
                let _res = res.data[0];
                if (!_res.together) {
                  wx.showToast({
                    title: '请填写基础信息',
                  })
                  setTimeout(() => {
                    wx.switchTab({
                      url: '/pages/edit/index'
                    })
                  }, 500);
                } else {
                  wx.setStorageSync('baseInfo', _res);
                  // 返回
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 500);
                }
              }
            })
        } else {
          wx.showToast({
            icon: 'none',
            title: '账号或密码不正确',
          })
        }
      },
    })
  },
  onInput(e) {},
})