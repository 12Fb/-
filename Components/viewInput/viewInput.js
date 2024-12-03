// Components/viewInput/viewInput.js
import { promiseSelector, pxRaterpx } from "@/common/utils/index";
Component({
  externalClasses: ["vi-class"],
  /**
   * 组件的属性列表
   */
  attached() {
    this.setData({
      inputValue: this.data.value,
    });
  },
  detached() {},
  properties: {
    value: {
      type: null,
      value: "",
    },
    placeholder: {
      type: String,
      value: "placeholder",
    },
    cursorStart: {
      type: Number,
      value: "0",
    },
    fontSize: {
      type: String,
      value: "32rpx",
    },
    height: {
      type: String,
      value: "50rpx",
    },
    width: {
      type: String,
      value: "100%",
    },
    Class: {
      type: String,
      value: "",
    },
    show: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  observers: {
    fontSize: function (newVal) {
      console.log("newVal", newVal);
      const font = this.extractNumberToPx(newVal, 1.2);
      this.setData({
        cursorFont: font,
      });
    },
    show: function (newVal) {
      if (this.data.isFocus !== false)
        this.setData({
          isFocus: false,
        });
    },
  },
  data: {
    cursorFont: "38rpx",
    inputNode: null,
    isPlaceHolder: true,
    canvas: null,
    inputValue: "",
    inputArr: [],
    isFocus: false,
    curIndex: -1,
    cursorLetterFontSize: "",
    onTap: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getTap(e) {
      console.log("最外层", e);
    },
    //绑定在container上
    catchTap(e) {
      this.triggerEvent("tap")
      this.setData({
        isFocus: true,
      });
      
      if (this.data.onTap === 0) {
        this.setData({
          curIndex: this.data.inputArr.length - 1,
        });
      }
      this.setData({
        onTap: 0,
      });
    },
    // 绑定每一个字母上
    onTap(e) {
      this.data.onTap = 1;
      let { index } = e.currentTarget.dataset;
      this.setData({
        curIndex: index,
      });
    },
    onInput(e) {
      let { value } = e.detail;
      value = value.trim()
      if (value != -1 && value != 0) {//添加
        this.data.inputArr.splice(this.data.curIndex + 1, 0, value);
        console.log(value,this.data.inputArr)
        this.setData({
          inputValue: this.data.inputArr.join(""),
          curIndex: this.data.curIndex + 1,
        });
      } else if (value == 0) {//收起键盘
        this.setData({
          isFocus: false,
        });
      } else {//删除
        if (this.data.curIndex >= 0)
          this.data.inputArr.splice(this.data.curIndex, 1);
        this.setData({
          inputValue: this.data.inputArr.join(""),
          curIndex: this.data.curIndex - 1 >= 0 ? this.data.curIndex - 1 : -1,
        });
      }
      if (value != 0) {
        this.triggerEvent("input", {
          value: this.data.inputValue,
        });
      }
    },

    //将font-size属性转换为px并返回数字部分
    extractNumberToPx(str, num = 1) {
      let temp = str.slice(0, -2);
      if (temp[temp.length - 1] === "r") {
        temp = temp.slice(0, -1);
        return Number(temp) * pxRaterpx() * num;
      }
      return Number(temp) * num;
    },
    toRpx(ch) {
      return String(ch) + "rpx";
    },
  },
});
