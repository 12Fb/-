// custom-tab-bar/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

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
      text: "组件"
    }, {
      pagePath: "/pages/funs/index",
      iconPath: "",
      selectedIconPath: "",
      text: "接口"
    },
    {
      pagePath: "/pages/index/index",
      iconPath: "",
      selectedIconPath: "",
      text: "接口"
    },
    {
      pagePath: "/pages/all/index",
      iconPath: "",
      selectedIconPath: "",
      text: "接口"
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      console.log(event.detail)
      //跳转
      let _url = this.data.list[Number(event.detail)].pagePath
      wx.switchTab({
        url:_url,
        fail:(e) =>{
          console.log(e)
        },
      })
      this.setData({ active: event.detail });
    },
  }
})