// pages/exercises/createExe/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTemplate: true,
    tagName: '',
    checkBox: [1, 2],
    check: true,
    active: 0, //步骤条
    steps: [{
        text: '题目类型',
        desc: '',
        // inactiveIcon: 'location-o',
        // activeIcon: 'success',
      },
      {
        text: '知识点',
        desc: '',
        // inactiveIcon: 'like-o',
        // activeIcon: 'plus',
      },
      {
        text: '描述'
      },
      {
        text: '预览',
        desc: '',
        // inactiveIcon: 'star-o',
        // activeIcon: 'cross',
      },

    ],
    items:['Dijkstra最短路径','集合运算','长文本测试啦啦啦啦啦啦啦啦啦啦'],
    exeData: {
      choice: -1,
      desc: {
        name: '',
        description: '',
        images: [{
          url: 'http://iph.href.lu/60x60?text=default',
          name: '图片2',
          isImage: true,
          deletable: true,
        }, ],
        tags: ['tag1', 'tag2']
      },
      function: {

      }
    },
    
  },
  upload(e) {
    console.log(e)
  },
  afterRead(e) {
    console.log('afterRead')
  },
  beforeRead(e) {
    console.log(e, 'before')
  },
  //题目名称input
  onNameInput(e) {
    this.data.exeData.desc.name = e.detail;
    this.setData({
      exeData: this.data.exeData
    })
  },
  onDescriptionInput(e) { //题目描述
    this.data.exeData.desc.description = e.detail;
    this.setData({
      exeData: this.data.exeData
    })
  },
  //删除标签
  onClose(e) {
    const id = Number(e.target.id)
    let {
      tags
    } = this.data.exeData.desc
    this.data.exeData.desc.tags = tags.filter((tag, index) => index !== id)
    this.setData({
      exeData: {
        ...this.data.exeData
      }
    })
  },
  addTag() {
    this.data.exeData.desc.tags.push(this.data.tagName)
    this.setData({
      tagName: '',
      exeData: this.data.exeData
    })
  },
  
  onTab1(e) { 
    let id = e.target.id
    this.setData({
      allData: {
        ...this.data.allData,
        choice: id
      },

    })
    this.next()
  },
  onTab2(e){
    const id = Number(e.target.id)
    this.next()
    //暂时写死,始终进入最短路径    
  },
  onTab3(e){
  },
  onCheck(e) {
    this.setData({
      check: e.detail
    })
  },
  next() {
    this.setData({
      active: (this.data.active + 1) % this.data.steps.length
    })
  },
  previous() {
    this.setData({
      active: (this.data.active - 1 + this.data.steps.length) % this.data.steps.length
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