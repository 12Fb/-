// pages/firstPage/components/card/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    info:{
      type:Object,
      courseValue:{
        course:"计算机忘了",
        num:89,
        temp:2
      },
      classValue:[
        {
          name:"一班",
          num:34
        },
        {
          name:"二班",
          num:334
        },
      ],
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    show:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose(){
      this.setData({
        show:false
      })
    },
    intoPopup(){
      this.setData({
        show:true
      })
    }
  }
})