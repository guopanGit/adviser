// app.js
App({
  onLaunch() {
    // 获取系统信息  获取导航栏高度
    let systemInfo = wx.getSystemInfoSync();
    let model = systemInfo.model;
    this.globalData.height = systemInfo.statusBarHeight
    this.globalData.isIphoneX = /iphone\sx/i.test(model) || (/iphone/i.test(model) && /unknown/.test(model)) || /iphone\s11/i.test(model);

    // 检查更新
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate) {
        updateManager.onUpdateReady((res) => {
          wx.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启小程序？",
            success: (res) => {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
            }
          })
        })
      }
    })
  },

  globalData: {
    isIphoneX: false
  }
})
