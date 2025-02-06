// pages/message/chat/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infos:[
      {
        content:"哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
        time:"1月14号15:18",
        userName:"黄博远",
        avatar:"https://img.yzcdn.cn/vant/cat.jpeg",
        pictureUrl:['https://img.yzcdn.cn/vant/cat.jpeg']
      },
      {
        content:"哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
        time:"1月15号15:18",
        userName:"黄博远",
        avatar:"https://img.yzcdn.cn/vant/cat.jpeg",
        pictureUrl:['https://img.yzcdn.cn/vant/cat.jpeg']
      },
      {
        content:"哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
        time:"1月15号15:18",
        userName:"黄博远",
        avatar:"https://img.yzcdn.cn/vant/cat.jpeg",
        pictureUrl:[]
      }
    ]
  },
  //
  intoPublish(e){
    wx.navigateTo({
      url: '/pages/message/chat/pages/publish/index',
    })
  },
  toComment(e){
    wx.navigateTo({
      url: '/pages/message/chat/pages/comment/index',
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