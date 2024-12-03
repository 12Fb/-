import Logic from "../../utils/logic";
import replaceMent from "../../utils/replace"
// pages/fun4/fun4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curFocus:0,
    result:'',
    curPre:'',
    curCon:'',
    pre: [],
    con: [],
  },
  closeKb(e){
    this.setData({
      show1:false,
      show2:false
    })
    console.log(e)
  },
  changeFocus:function(e){
    console.log(e);
    if(e.target.id === 'pre') this.data.curFocus =1; 
    else this.data.curFocus = 2;
  },
  handleClickMathBt:function(e){
    let symbol = e.detail.target.dataset.text
    console.log(this.data.curPre)
    if(this.data.curFocus === 1) {
      this.setData({
        curPre:this.data.curPre+symbol
      })
    }
    else if(this.data.curFocus === 2){
      this.setData({
        curCon:this.data.curCon+symbol
      })
    }

  },
  resetPre: function(e) {
    this.data.pre = [];
    this.setData({
      pre:this.data.pre
    })
  },
  resetCon: function(e) {
    this.data.con = [];
    this.setData({
      con:this.data.con
    })
  },
  addPre: function(e) {
    this.data.pre.push(this.data.curPre)
    this.setData({
      pre: this.data.pre,
      curPre: ''
    })
  },
  addCon: function(e) {
    this.data.con = [];
    this.data.con.push(this.data.curCon)
    this.setData({
      con: this.data.con,
      curCon: ''
    })
  },
  preInput:function(e){
    this.setData({
      curPre: e.detail.value
    })
  },
  conInput:function(e){
    this.setData({
      curCon: e.detail.value
    })
  },
  //调用logic类得到结果
  getResult: function(e) {
    let logic = new Logic();
    let pres = this.data.pre;
    let con = this.data.con[0];
    pres.forEach((pre) =>{
      logic.addPreMise(replaceMent(pre));
    })
    logic.addInference(replaceMent(con));
    let re = logic.judInference();
    this.setData({
      result: re ? "true": "false"
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