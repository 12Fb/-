// pages/exercises/createExe/index.js
import Draw from '../../../common/draw'
import djkstra from '../../../common/algos/djkstra'

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
    steps: [
      {
        text: '题目类型',
      },
      {
        text: '知识点',
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
    items: ['Dijkstra最短路径', '集合运算', '长文本测试啦啦啦啦啦啦啦啦啦啦'],
    models: ['模板一', '模板二'],
    exeData: {
      choice: -1,
      desc: {
        name: '',
        description: '',
        images: [
          {
            url: 'http://iph.href.lu/60x60?text=default',
            name: '图片2',
            isImage: true,
            deletable: true,
          },
        ],
        tags: ['tag1', 'tag2'],
      },
      function: {},
    },
    models: ['模板一', '模板二', '模板三'],
    //题目模板
    modelData: {
      algo:djkstra, 
      params: {
        gra: {
          0: { 1: 2, 2: 6 },
          1: { 0: 2, 3: 5 },
          2: { 0: 6, 3: 8 },
          3: { 1: 5, 2: 8, 5: 15, 4: 10 },
        },
        start: 0,
        end: 6,
      },
      value:10,//分值
      type:'choose' // choose | blank
    },
  },
  upload(e) {
    console.log(e);
  },
  afterRead(e) {
    console.log('afterRead');
  },
  beforeRead(e) {
    console.log(e, 'before');
  },
  //题目名称input
  onNameInput(e) {
    this.data.exeData.desc.name = e.detail;
    this.setData({
      exeData: this.data.exeData,
    });
  },
  onDescriptionInput(e) {
    //题目描述
    this.data.exeData.desc.description = e.detail;
    this.setData({
      exeData: this.data.exeData,
    });
  },
  //删除标签
  onClose(e) {
    const id = Number(e.target.id);
    let { tags } = this.data.exeData.desc;
    this.data.exeData.desc.tags = tags.filter((tag, index) => index !== id);
    this.setData({
      exeData: {
        ...this.data.exeData,
      },
    });
  },
  addTag() {
    this.data.exeData.desc.tags.push(this.data.tagName);
    this.setData({
      tagName: '',
      exeData: this.data.exeData,
    });
  },

  onTab1(e) {
    let id = e.target.id;
    this.setData({
      allData: {
        ...this.data.allData,
        choice: id,
      },
    });
    this.next();
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

  onCheck(e) {
    this.setData({
      check: e.detail,
    });
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
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

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
