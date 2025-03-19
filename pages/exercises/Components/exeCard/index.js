// pages/exercises/Components/exeCard/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Object,
      value:{
        id:"1",
        name: 'lalala',
        type:1,//选择题或者是填空题
        description:'非常简单的一道题',
        tags:['离散数学','计算机网络']
      }
    },
    url:{
      type:String,
      value:''
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
    goto(e){   //跳转到题目演示页面
      const id = e.currentTarget.id
      const data = this.properties.data
      wx.setStorageSync(id, data)
      console.log(22222)
      wx.navigateTo({
        url: '/pages/exercises/showExe/index',
      })
      
    }
  }
})