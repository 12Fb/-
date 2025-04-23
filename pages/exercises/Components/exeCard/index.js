// pages/exercises/Components/exeCard/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Object,
      value:{}
    },
    url:{
      type:String,
      value:''
    }
  },
  lifetimes:{
    attached: function(){
    }
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
    onTap(e){
      this.triggerEvent('tap',{
        event:e
      })
    },
  }
})