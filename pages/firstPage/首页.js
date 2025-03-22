// pages/firstPage/首页.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add_overlay:false,
    fileList: [],
    funFontSize:25,
    funIconSize: 90,
    avtive: 1,
    value: {
      courseValue: {
        course: "计算机忘了",
        num: 89,
      },
      classValue:[
        {
          name:"一班",
          num:34
        },
        {
          name:"一班",
          num:334
        }],
    }
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  goto(e){
    console.log(e.currentTarget)
    let id = parseInt(e.currentTarget.id)
    switch(id) {
      case 1 : wx.navigateTo({
        url: '/pages/exercises/index',
      })
    }
  },
  newClass(){
    this.setData({
      add_overlay:true
    })
  },
  onClose(){
    this.setData({
      add_overlay:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})