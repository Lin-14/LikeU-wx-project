const showLogin = function () {
  wx.showModal({
    title: '尚未登录',
    content: '请登录以使用完整功能',
    confirmText: '去登录',
    confirmColor: '#ff69b4',
    success(res) {
      if (res.confirm) {
        wx.navigateTo({
          url: '/pages/login/index'
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

module.exports = {
  showLogin,
}