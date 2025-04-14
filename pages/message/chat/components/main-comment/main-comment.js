Component({
  properties: {
    avatar: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: ''
    },
    time: {
      type: String,
      value: ''
    },
    area: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    replies: {
      type: Array,
      value: []
    }
  },
  data: {
    showReplies: false // 用于存储回复是否显示的状态
  },
  methods: {
    toggleReplies() {
      this.setData({ showReplies: !this.data.showReplies });
    }
  }
})


