// Components/customKeyboard/customKeyBoard.js
//val 为-1的情况下是删除

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    customKeys:{
      type:Array,
      value:[]
    },
    show:{
      type:Boolean,
      value:false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    kb_translate:"0% 100%",
    //25个除了u
    arr: [],
    letters: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
    symbol: ["'",",","∪", "∩", "-"],
  },
  observers:{
    "show" :  function(show){
      wx.hideKeyboard()
      wx.nextTick(()=>{
        this.setData({
          kb_translate: show ? "0 0" : "0 100%"
        })
      })
      
    }
  },

  //生命周期
  attached() {
    //处理自定义键
    let tempCustomKeys = this.data.customKeys.concat(this.data.symbol).slice(0,6);
    this.setData({
      symbol:tempCustomKeys
    })
    //处理一下字母
    let temp = this.data.letters.map((v) => {
      let obj = this.initItem(v, 1);
      return obj;
    });
    //处理空格，删除，逗号等通用
    temp = this.processGeneral(temp);
    this.setData({
      arr: temp,
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTap1(e){
      console.log("parent")
    },
    onCaptureTap(e){
      console.log('son')
    },
    //fun : 1添加， -1减少,catIndex表示哪一类按键,不同按键宽度不同
    initItem(val, catIndex, fun = 1, select = false) {
      let cats = ["letter", "secItem", "thirdItem", "fourthItem"];
      let className = typeof catIndex === "number" ? cats[catIndex - 1] : catIndex;
      return {
        value: val,
        select,
        cat: className,
        fun,
      };
    },
    processGeneral(arr) {
      //给键盘上的某个元素加上class
      const addClass = (_index, classes) => {
        if(!Array.isArray(classes)) classes = [classes]
        let temp = arr[_index].cat;
        classes.forEach((_class) => {
          temp += " " + _class;
        });
        arr[_index].cat = temp;
      };
      let index;
      let count=0,limit=0;
      //处理第二行左右两边第一个item
      index = arr.indexOf(arr.find((item) => item.value === "K"));
      addClass(index, ["kb-leftBorder"]);
      index = arr.indexOf(arr.find((item) => item.value === "S"));
      addClass(index, ["kb-rightBorder"]);
      //插入第二行的特殊符号
      index = arr.indexOf(arr.find((item) => item.value === "T"));
      for(; count <limit+2; count++){
        arr.splice(arr.length, 0, this.initItem(this.data.symbol[count], 1));
      }

      arr.splice(arr.length, 0, this.initItem("-1", " iconfont ~icon-kaidan-zidingyijianpanshanchu"));
      // 插入最后一行的特殊符号
      limit =count +2
      for(; count <limit; count++){
        arr.splice(arr.length, 0, this.initItem(this.data.symbol[count], 1));
      }
      // arr.splice(arr.length, 0, this.initItem(")", 1));
      // arr.splice(arr.length, 0, this.initItem("- ", 1));
      arr.splice(arr.length, 0, this.initItem(" ", 4)); //空格
      limit=count+1
      for(; count < limit; count++){
        arr.splice(arr.length, 0, this.initItem(this.data.symbol[count], 1));
      }
      arr.splice(arr.length, 0, this.initItem("(", 1));
      arr.splice(arr.length, 0, this.initItem(")", 1));     
      arr.splice(arr.length, 0, this.initItem("完成", 3));
      addClass(arr.length-1,["finish"])

      return arr;
    },
    stop(e){

    },
    onTap(e){
      wx.vibrateShort({
        type: 'medium',
      })
    },
    handleTouchStart(e) {
      let index = e.currentTarget.dataset.index;
      this.data.arr[index].select = true;
      this.setData({
        arr: this.data.arr,
      });
    },
    handleTouchEnd(e) {
      let { index, value } = e.currentTarget.dataset;
      this.data.arr[index].select = false;
      this.setData({
        arr: this.data.arr,
      });
      if(value === "完成") {
        this.triggerEvent("kb_input", { value:0 });
      }
      else {
        this.triggerEvent("kb_input", { value });
      }
    },
  },
});
