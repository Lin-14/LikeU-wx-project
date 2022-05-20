// components/navTop/index.js
Component({
  lifetimes: {
    attached() {
      var app = getApp();
      const {
        menuButtonInfo,
        systemInfo
      } = app.globalData;
      this.setData({
        navBarHeight: (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
          menuButtonInfo.height + systemInfo.statusBarHeight
      })
      this.setData({
        menuHeight: `${wx.getMenuButtonBoundingClientRect().height}px`
      })
      this.setData({
        menuRight: systemInfo.screenWidth - menuButtonInfo.right
      })
      this.setData({
        menuBotton: menuButtonInfo.top - systemInfo.statusBarHeight
      })
      this.setData({
        menuTop: `${wx.getMenuButtonBoundingClientRect().top}px`
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    back: { // 是否有返回
      type: Boolean,
      value: true
    },
    title: { // 标题文字
      type: String,
      value: 'HRX ❤ LYK'
    },
    textColor: { // 文字颜色 黑或白
      type: String,
      value: 'white'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    menuHeight: "", // 胶囊高度
    menuTop: "", // 胶囊距顶部距离
    menuRight: 0, // 胶囊距右方距离
    menuBotton: 0, // 胶囊距底部距离
    navBarHeight: 0, // 导航栏高度
    backgroundColor: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})