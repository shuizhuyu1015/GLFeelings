// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js';

const audioManager = wx.getBackgroundAudioManager();

Component({
  behaviors: [classicBeh],

  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playSrc: 'images/player@play.png',
    pauseSrc: 'images/player@pause.png',
    palying: false
  },

  lifetimes: {
    attached(){
      // 组件每次被初始化进入页面的时候，检测播放状态
      this._recoverStatus();

      // 监听全局音频管理器播放状态
      this._monitorAudioSwitch();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(){
      if(!this.data.playing) {
        this.setData({
          playing: true
        })
        audioManager.src = this.properties.src;
        audioManager.title = this.properties.title;
      }else{
        this.setData({
          playing: false
        })
        audioManager.pause();
      }
    },

    // 检测当前全局音频播放管理器播放的音乐是否是当前显示的音乐组件，回复播放按钮状态
    _recoverStatus(){
      if(audioManager.paused){
        this.setData({
          playing: false
        });
        return;
      }
      if(audioManager.src == this.properties.src){
        this.setData({
          playing: true
        });
      }
    },

    // 监听全局播放管理器状态
    _monitorAudioSwitch(){
      audioManager.onPlay(() => {
        this._recoverStatus();
      });
      audioManager.onPause(() => {
        this._recoverStatus();
      });
      audioManager.onStop(() => {
        this._recoverStatus();
      });
      audioManager.onEnded(() => {
        this._recoverStatus();
      });
    }
  }
})
