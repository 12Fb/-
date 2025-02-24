// custom-tab-bar/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },
 attached(){
   
 },
  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    list: [{
      pagePath: "/pages/firstPage/首页",
      iconPath: "",
      selectedIconPath: "",
      text: "首页"
    }, {
      pagePath: "/pages/funs/index",
      iconPath: "",
      selectedIconPath: "",
      text: "功能"
    },
    {
      pagePath: "/pages/funs/index",
      iconPath: "",
      selectedIconPath: "",
      text: "创建"
    },
    {
      pagePath: "/pages/message/index",
      iconPath: "",
      selectedIconPath: "",
      text: "消息"
    },
    {
      pagePath: "/pages/setting/index",
      iconPath: "",
      selectedIconPath: "",
      text: "个人"
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      console.log(event.detail)
      this.setData({ active: event.detail });
      //跳转
      let _url = this.data.list[Number(event.detail)].pagePath
      wx.switchTab({
        url:_url,
        fail:(e) =>{
          console.log(e)
        },
      })
    },
  }
})