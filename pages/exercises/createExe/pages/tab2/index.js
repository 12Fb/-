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
      value:{}
    }
  },
  lifetimes: {
     attached: async function() {
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
      A:0,
      B:30,
      C:40,
      D:22
    },
    changeAbleEle:{value:'未选择',type:'edge'},
    // 题目相关
    title:'啦啦啦',
    active:'A',
    answer:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    exeAlgo(){

      const {ans,path} = this.algo(this.data.gra,this.data.start,this.data.end)
      this.setData({
        ans:ans
      })
      console.log(path)
      //标记
      for(let i in path) {
        this.drawInstance.markEle(path[i])
      }
    },
    back(){
      this.drawInstance.back()
    },
    init(){

    },
     initGra() {
      const _Draw = new Draw('canvas', this);
      this.drawInstance = _Draw;
      const fn = () => {  //这个函数暂时写死,理论上从后端获取
        this.drawInstance.Draw_Undirected_Graph(this.data.gra);
      };
      fn()
    },
    onTouchStart(e) {
      const touch = e.changedTouches[0];
      const {type,name} =this.drawInstance.onTouchStart(touch.x, touch.y,false);
      if(type === this.data.changeAbleEle.type){
        this.data.changeAbleEle.value = name
        this.setData({
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
