// pages/exercises/createExe/pages/tab2/index.js
import Draw from '../../../../../common/draw';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    algoName: {
      type: String,
      value: '',
    },
  },
  lifetimes: {
    async attached() {
      const { algo, steps,ops } = require(`../../../../../common/algos/${this.properties.algoName}`);
      this.algo = algo;
      // console.log(algo)
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    alog: null,
    steps: [],
    value:null,
    gra:{
      0: { 1: 2, 2: 6 },
      1: { 0: 2, 3: 5 },
      2: { 0: 6, 3: 8 },
      3: { 1: 5, 2: 8, 5: 15, 4: 10 },
      4: { 3: 10, 6: 2 },
    },
    start:0,
    end:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    del(){
      const obj = this.drawInstance.del()
      console.log(obj)
      
    },
    algo(){
      console.log(this.algo)
      const {obj} = this.algo(this.data.gra,start,end)
      // this.setData({
      //   value:value
      // })
    },
    back(){
      this.drawInstance.back()
    },
    async initGra() {
      const _Draw = new Draw('canvas', this);
      await _Draw.waiting();
      this.drawInstance = _Draw;
      const fn = () => {  //这个函数暂时写死,理论上从后端获取
        this.drawInstance.Draw_Undirected_Graph(this.data.gra);
      };
      fn()
    },
    onTouchStart(e) {
      const touch = e.changedTouches[0];
      this.drawInstance.onTouchStart(touch.x, touch.y);
    },
    onTouchMove(e) {
      const touch = e.changedTouches[0];
      this.drawInstance.onTouchMove(touch.x, touch.y);
    },
    onTouchEnd(e) {
      this.drawInstance.onTouchEnd();
    },
  },
});
