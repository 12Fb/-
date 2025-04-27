// pages/exercises/createExe/pages/tab3/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Object,
      value:{}
    },
    padding:{
      type:String,
      value:'10rpx'
    },
    description:{
      type:Boolean,
      value:true
    },
    name:{
      type:Boolean,
      value:true
    }
  },

  lifetimes: {
   attached: function() {
   },
 
 },
  /**
   * 组件的初始数据
   */
  
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChoose(e){
      this.setData({
        selected:e.target.id
      })
      this.triggerEvent('answer',{

      })
    }
  }
})