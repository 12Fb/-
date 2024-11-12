// Components/viewInput/viewInput.js
import { promiseSelector ,pxRaterpx} from "@/common/utils/index"
Component({

  /**
   * 组件的属性列表
   */
   attached(){
     this.setData({
       inputValue:this.data.value
     })
  },
  detached(){

  },
  properties: {
    value:{
      type:null,
      value:''
    },
    placeholder:{
      type:String,
      value:"placeholder"
    },
    cursorStart:{
      type:Number,
      value:"0"
    },
    fontSize:{
      type:String,
      value:"32rpx"
    },
    height:{
      type:String ,
      value: "50rpx"
    },
    width:{
      type:String,
      value: "100%"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputNode:null,
    isPlaceHolder:true,
    canvas:null,
    inputValue:"",
    inputArr:[],
    isFocus:false,
    curIndex:-1,
    cursorLetterFontSize:"",
    onTap:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //绑定在container上
     catchTap(e){
       this.setData({
         isFocus:true
        })
        if(this.data.onTap === 0) {
          this.setData({
            curIndex:this.data.inputArr.length-1
          })
        }
        this.setData({
          onTap:0
        })
    },
    // 绑定每一个字母上
    onTap(e){
      this.data.onTap=1;
      let {index} = e.currentTarget.dataset
      this.setData({
        curIndex:index
      })
    },
    onInput(e){
      const {value} = e.detail
      if(value != -1 && value !=0){
        this.data.inputArr.splice(this.data.curIndex+1,0,value)
        this.setData({
          inputValue:this.data.inputArr.join(''),
          curIndex:this.data.curIndex+1
        })
      }
      else if(value == 0){
        this.setData({
          isFocus:false
        })
      }
      else {
        this.setData({
          inputValue: this.data.inputValue.slice(0,-1)
        })
     
      }
      if(value != 0) {
        this.triggerEvent("input",{value:this.data.inputValue})
      }
    },
 
    //将font-size属性转换为px并返回数字部分
    extractNumberToPx(str,num=1){
      let temp = str.slice(0,-2)
      if(temp[temp.length-1] === "r") {temp = temp.slice(0,-1);
        return Number(temp) * pxRaterpx()*num
      }
      return Number(temp)*num
    },
    toRpx(ch){
      return String(ch) + "rpx"
    }
  }
  
})