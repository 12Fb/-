// pages/exercises/createExe/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkBox:[1,2],
    check:true,
    active:0,//步骤条
 steps: [
  {
    text: '题目类型',
    desc: '',
    // inactiveIcon: 'location-o',
    // activeIcon: 'success',
  },
  {
    text: '描述',
    desc: '',
    // inactiveIcon: 'like-o',
    // activeIcon: 'plus',
  },
  {
    text: '预览',
    desc: '',
    // inactiveIcon: 'star-o',
    // activeIcon: 'cross',
  },
  
    ],
    allData:{
      choice:-1,
      desc:{
        name:'',
        description:'',
        image:'',
      },
      function:{

      }
    }
  },
  onChoice(e){
    let id = e.target.id
    this.setData({
      allData:{
        ...this.data.allData,
        choice:id
      },
      
    })
    this.next()
  },
  onCheck(e){
    this.setData({
      check:e.detail
    })
  },
next(){
  this.setData({
    active:(this.data.active+1)%this.data.steps.length
  })
},
previous(){
  this.setData({
    active:(this.data.active-1 + this.data.steps.length)%this.data.steps.length
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