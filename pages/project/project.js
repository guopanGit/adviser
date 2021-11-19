// 项目详情/project.js


import {
  network,
  setNav, showToast
} from '../../utils/util'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: true,
    isIphoneX: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    let isIphoneX = app.globalData.isIphoneX
    // 检查是否有网络
    network().then((res) => {
      if (res.networkType === 'none') {
        this.setData({
          type: false
        })
      }
    })
    this.setData({
      isIphoneX
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    setNav('项目详情', '1')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  // 点击模块
  toDetails(e) {
    showToast('项目详情')
  },

  // 点击课程
  clickCourse() {
    showToast('点击课程')
  },

  // 立即沟通
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '110'
    })
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 生命周期函数--监听分享
   */
  onShareAppMessage() {
    return {
      title: '项目参谋'
    }
  }

})