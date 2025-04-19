// pages/exercises/createExe/index.js
import Draw from '../../../common/draw'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0, //步骤条
    steps: [
      {
        text: '基础信息',
      },
      {
        text: '创建未知量',
      },
      {
        text: '模板',
      },
      {
        text: '描述',
      },
      {
        text: '预览',
      },
    ],
    algoSteps:[],
    //tab1
    knowledge: ['Dijkstra最短路径', '集合运算', '长文本测试啦啦啦啦啦啦啦啦啦啦lalalallalalalalallalalalalS'],
    exeType:['选择题','填空题'],
    tags:['离散数学','最短路径'],
    models: ['自定义','模板一', '模板二', '模板三'],
    tab1_choice:{
      knowledge:0,
      exeType:0,
      models:1,
      tags:{'0':'离散数学'}
    },
    edit:false,
    tagValue:'',
    //tab2
    unKnown:['点','边','最短路径','起始点','结束点'],
    tab2_choice:{
    },
    //题目模板
  },
  //题目名称input
  onEdit(){
    this.setData({
      edit:true
    })
  },
  onBlur(e){
    this.data.tags.push(this.data.tagValue)
    this.data.tab1_choice.tags[this.data.tags.length-1] = this.data.tagValue
    this.setData({
      edit:false,
      tagValue:'',
      tags:this.data.tags,
      tab1_choice:this.data.tab1_choice
    })
  },
  onTab1(e) {
    let key = e.currentTarget.id 
    let value = Number(e.target.id);
    if(key === 'tags' && !this.data.edit ){
      const item = this.data.tags[value]
      if(!this.data.tab1_choice[key][value])
        this.data.tab1_choice[key][value] = item
      else delete this.data.tab1_choice[key][value]
      this.setData({
        tab1_choice:this.data.tab1_choice
      })
    }
    else {
      this.data.tab1_choice[key] = value
      this.setData({
        tab1_choice:this.data.tab1_choice
      })
    }
  },
  onTab2(e) {
    const id = Number(e.target.id);
    this.next();
    //暂时写死,始终进入最短路径
  },
   onTab3(e) {
    this.next()
  },
  onTab4(e) {
    this.next()
  },
  next() {
    this.setData({
      active: (this.data.active + 1) % this.data.steps.length,
    });
  },
  previous() {
    this.setData({
      active: (this.data.active - 1 + this.data.steps.length) % this.data.steps.length,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async onReady(){
    // this.gra = {
    //   0: { 1: 2, 2: 6 },
    //   1: { 0: 2, 3: 5 },
    //   2: { 0: 6, 3: 8 },
    //   3: { 1: 5, 2: 8, 5: 15, 4: 10 },
    //   4: { 3: 10, 6: 2 },
    // }
    // const draw = new Draw('canvas',this)
    // await draw.waiting()
    // this.drawInstance = draw
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
