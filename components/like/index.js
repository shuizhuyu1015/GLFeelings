// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
    },
    readOnly: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like_sel.png',
    noSrc: 'images/like_nor.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event) {
      if (this.properties.readOnly) {
        return
      }
      
      let like = this.properties.like;
      let count = this.properties.count;

      count = like ? count - 1 : count + 1;
  
      this.setData({
        like: !like,
        count: count
      })

      // 触发组件事件到主页面
      let behavior = this.properties.like ? 'like' : 'cancel';
      this.triggerEvent('like', {
        behavior: behavior
      }, {})
    }
  }
})
