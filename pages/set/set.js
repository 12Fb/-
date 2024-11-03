// pages/set/set.js
import Set from "../../utils/set"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setObj : {},
    exp:'',
    inputTarget:{},
    expVal:"",
    lock:0
  },
  replaceMent(str){
    let temp = str.replace(/∩/g,'&').replace(/∪/g,'|')
    return temp;
  },
  handleExpTap(){
    this.data.lock = 1;
  },
  handleTap(e){
    if(!e.target.id.includes('inputExp')) this.data.lock=0;
    console.log(this.data.lock)
  },
  handleMathBtClick(e){
    const val = e.detail.target.dataset.text;
    if(this.data.lock && val){
      this.setData({
        expVal:this.data.expVal+val
      })
      console.log(this.data.expVal)
    }
  },
  handleCalTap(e){
    let set = new Set();
    let setObj = this.data.setObj;
    //依次加入集合
    for(let key in setObj){
      set.add(setObj[key],key,this.data.exp);
    }
    let re=set.operate(this.replaceMent(this.data.exp))
    console.log(re)
  },
  inputSet(e){
    const val = e.detail.value;
    const index = e.target.id;
    this.data.setObj[index] = val;
  },
  expInput(e){
    const val = e.detail.value;
    this.setData({
      expVal:val
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