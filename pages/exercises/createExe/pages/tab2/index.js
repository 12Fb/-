// pages/exercises/createExe/pages/tab2/index.js
import Draw from '../../../../../common/draw';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value:{
      type:Number,
      value:5
    },
    id:{
      type:String,
      value:1
    },
    algoName: {
      type: String,
      value: '',
    },
    data:{
      type:Object,
      value:{
        exeType:0
      }
    }
  },
  lifetimes: {
     attached: async function() {
      //  初始化画布
      const temp = new Draw('canvas', this);
      await temp.waiting();
      this.drawInstance = temp;
      this.drawInstance.Draw_Undirected_Graph(this.data.gra)
      const algo= require(`../../../../../common/algos/${this.properties.algoName}`);
      let dj = algo.default
      const {path,ans} = dj(this.data.gra,0,6)
      for(let i =1; i< path.length; i++) {
        let name = path[i-1]+'edge'+path[i]
        this.drawInstance.modifityEdge(name,'red')
      }
      this.data.answer = ans
      // 初始化一些数据
      this.setData({
        _text:this.data.text
      })
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    steps: [],
    ans:null,
    gra:{
      0: { 1: 2, 2: 6 },
      1: { 0: 2, 3: 5 },
      2: { 0: 6, 3: 8 },
      3: { 1: 5, 2: 8, 5: 15, 4: 10 },
      4: { 3: 10, 6: 2 },
    },
    // 单独获取
    start:0,
    end:6,
    options:{
      A:null,
      B:30,
      C:40,
      D:22
    },
    changeAbleEle:{value:'未选择',type:'edge'},
    // 题目相关
    name:'题目一',
    active:'A',
    answer:null,
    text:'已知上图是一个无向图,从点0到点6的最短路径是22请问边$值是多少__',
    _text:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 目前是保存的功能
    back(){
      this.drawInstance.back();
    },
     async save(){
      this.drawInstance.save()
      // canvas传图片
      const res1 = await wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvas: this.drawInstance.canvas,
      })
      // 上传图片
      const res2 = await wx.cloud.uploadFile({
        cloudPath:'test.png',
        filePath:res1.tempFilePath
      })
      const {fileID} =  res2;
      // 选择题
      if(this.properties.data.exeType ==0) {
          this.triggerEvent('onSave',{
          text:this.data._text,
          options:this.data.options,
          answer:this.data.answer,
          imageId:fileID,
          name:this.data.name
        })
      }
    },
    // 题目相关
    onOption(e){
      const id = e.target.id;
      if(this.data.active == id) return;
      this.setData({
        active:id
      })
    },
    del(){
      const obj = this.drawInstance.clip()
      console.log(obj)
      
    },
    onTouchStart(e) {
      const touch = e.changedTouches[0];
      const {type,name,value,ori_name} =this.drawInstance.onTouchStart(touch.x, touch.y,false);
      
      // 动态设置正确选项,默认是A
      this.data.options['A'] = value
      if(type ==='edge') {
        this.drawInstance.back()
        this.drawInstance.save();
        this.drawInstance.hideEdgeValue(ori_name)
      }
      if(type === this.data.changeAbleEle.type){
        this.data.changeAbleEle.value = name
        this.setData({
          _text:this.data.text.replace('$',name),
          answer:value,
          options:this.data.options,
          changeAbleEle:this.data.changeAbleEle
        })
      }
    },
    onTouchMove(e) {
      const touch = e.changedTouches[0];
      this.drawInstance.onTouchMove(touch.x, touch.y);
    },
    onTouchEnd(e) {
      return;
      this.drawInstance.onTouchEnd();
    },
  },
});
