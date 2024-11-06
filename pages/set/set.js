// pages/set/set.js
import Set from "../../utils/set";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canvasWidth: undefined,
    canvasHeight: undefined,
    canvas: null,
    setObj: {},
    exp: "",
    inputTarget: {},
    lock: 0,
    canvasAr: new Array(100),
    result: "",
  },
  replaceMent(str) {
    let temp = str.replace(/∩/g, "&").replace(/∪/g, "|");
    return temp;
  },
  handleExpTap() {
    this.data.lock = 1;
  },
  handleTap(e) {
    if (!e.target.id.includes("inputExp")) this.data.lock = 0;
    console.log(this.data.lock);
  },
  handleMathBtClick(e) {
    const val = e.detail.target.dataset.text;
    if (this.data.lock && val) {
      this.setData({
        exp: this.data.exp + val,
      });
    }
  },
  getCursor(e) {
    console.log(e);
  },
  //调用set Class计算
  handleCalTap(e) {
    let set = new Set(this.data.canvas);
    let setObj = this.data.setObj;
    //依次加入集合
    for (let key in setObj) {
      set.add(setObj[key], key);
    }
    set.inituSet();
    let re = set.operate(this.replaceMent(this.data.exp));
    console.log(re, "result");
    this.setData({
      result: re.join(","),
    });
    set.drawVenm(this.data.canvas, this.width, this.height);
  },
  inputSet(e) {
    const val = e.detail.value;
    const index = e.target.id;
    this.data.setObj[index] = val;
  },
  expInput(e) {
    const val = e.detail.value;
    this.setData({
      exp: val,
    });
  },
  //计算rpx和px，px*rate = rpx
  getRate() {
    const systemInfo = wx.getWindowInfo();
    return systemInfo.screenWidth / 750;
  },
  promiseSelector(id, size = true, node = true) {
    return new Promise((resolve, reject) => {
      wx.createSelectorQuery()
        .select(id)
        .fields({ node: node, size: size })
        .exec((res) => {
          if (res[0]) resolve(res[0]);
          else reject(new Error("元素未找到"));
        });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    const canvasNode = await this.promiseSelector("#canvas");
    const canvas = canvasNode["node"];
    const ctx = canvas.getContext("2d");
    const windowInfo = wx.getWindowInfo();
    const dpr = windowInfo.pixelRatio;
    //比例必须保证是 w/h 为2才行
    canvas.width = (canvas.width * dpr * canvasNode.width) / 300;
    canvas.height = (canvas.height * dpr * canvasNode.height) / 150;
    this.data.canvas = canvas;
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
