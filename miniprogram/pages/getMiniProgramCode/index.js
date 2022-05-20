Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveGetCodeSrc: false,
    envId: '',
    codeSrc: ''
  },

  onLoad(options) {
    this.setData({
      envId: options.envId
    });
  },

  getCodeSrc() {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getMiniProgramCode'
      }
    }).then((resp) => {
      this.setData({
        haveGetCodeSrc: true,
        codeSrc: resp.result
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      wx.hideLoading();
    });
  },

  clearCodeSrc() {
    this.setData({
      haveGetCodeSrc: false,
      codeSrc: ''
    });
  }

});
