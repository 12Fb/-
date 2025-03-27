// pages/class/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages:[
      {
        name: "计算机一班",
        info:"老师发布了作业",
        tag: "班级",
        time:"2022-3.12",
        isRead:false
      },
      {
        name: "计算机一班",
        info:"老师发布了作业",
        tag: "班级",
        time:"2022-3.12",
        isRead:false
      },
    ],
    show:false,
    actions: [
      {
        name: '发布公告',
      },
      {
        name: '发布题目',
      },
      {
        name: '发布试卷',
      },
    ],
    iconSize:60,
    fontSize:25,
    funlist:[
      {
        icon:'manager-o',
        name:'成员管理',
        color:'#ee7600'
      },
      {
        icon:'chat-o',
        name:'讨论区',
        color:"#ee6aa7"

      },
      {
        icon:'setting-o',
        name:'设置',
        color:'#ff00ff'
      }
    ],
    value:{
      id:'',
      name:'计算机一班'
    },
  },
Show(){
  this.setData({
    show:true
  })
},
onClose() {
  this.setData({ show: false });
},

onSelect(event) {
  console.log(event.detail);
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