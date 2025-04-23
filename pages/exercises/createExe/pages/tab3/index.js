// pages/exercises/createExe/pages/tab3/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Object,
      value:{}
    }
  },

  lifetimes: {
    attached: async function() {
      const imageId = this.properties.data.imageId
      const {fileList} = await wx.cloud.getTempFileURL({
        fileList:[imageId]
      })
      this.setData({
        url:fileList[0].tempFileURL,
        ...this.properties.data
      })
   },
 },
  /**
   * 组件的初始数据
   */
  
  data: {
    selected:'',
    name:'',
    text:'',
    url:"https://img.yzcdn.cn/vant/cat.jpeg",
    exeValue:5,
    exeType:1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async save(){
      //上传数据库
      const data = {
        name:this.data.name,
        text:this.data.text,
        value:this.exeValue,
        ...this.properties.data
      }
      const db = wx.cloud.database();
      const res = await db.collection('exercise').add({
        data,
      })
      this.triggerEvent('onSave',{
        id:res['_id']
      })
    },
    onChoose(e){
      this.setData({
        selected:e.target.id
      })
    }
  }
})