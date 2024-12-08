// ∧∨¬→↔
//引入
import Logic from '../../utils/logic'
import replaceMent from '../../utils/replace';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test:"123",
    show:false,
    customKeys:['∧','∨','¬','↔','→'],
    focus:true,
    inputValue: "",
    maxItem: "",
    minItem: ""
  },
  bindInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  closeKb(e){
    this.setData({
      show:false
    })
    console.log(e)
  },
  //输出结果
  handleTap:function(e){
    let str = replaceMent(this.data.inputValue);
    //todo： 判断输入合不合法
    const logic = new Logic();
    console.log(str);
    logic.addInference(str);
    this.setData({
      maxItem: replaceMent(logic.maxItem(),0),
      minItem: replaceMent(logic.minItem(),0)
    })
  },
  handleReset(){
      this.setData({
        inputValue: ""
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