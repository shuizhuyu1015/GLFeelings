// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    year: 0,
    month: '',
    _index: ''
  },

  attached: function() {
    let date = new Date();
    let nowYear = date.getFullYear();
    let nowMonth = date.getMonth();

    this.setData({
      year: nowYear,
      month: this.data.months[nowMonth]
    })
  },

  observers: {
    // 监听index的值，收到之后做出处理
    // 不在生命周期attached里面处理是因为，不能保证组件初始化完毕之后，index已经传进来了，可能网络延迟等，所以用监听函数
    'index': function(index) {
      let val = index < 10 ? '0' + index : index;
      this.setData({
        _index: val
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
