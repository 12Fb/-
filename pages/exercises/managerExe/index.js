// pages/exercises/managerExe/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exeArr:[],
  },
  onTap(e){
    const index= e.target.id;
    const data = JSON.stringify(this.data.exeArr[index])
    wx.navigateTo({
        url: `/pages/exercises/showExe/index?data=${data}`,
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
  async onReady() {
    const db = wx.cloud.database();
    // 默认一次只能取到前20条记录
      const res = await db.collection('exercise').get()
    this.setData({
      exeArr:res.data,
    })
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