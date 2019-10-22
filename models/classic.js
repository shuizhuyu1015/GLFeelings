import {HTTP} from '../utils/http.js';

class ClassicModel extends HTTP {
  getLatest(sCallBack) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallBack(res);
        this._setLatestIndex(res.index);
      }
    })
  }

  getClassic(index, nextOrPrevious, sCallBack) {
    this.request({
      url: 'classic/' + index + '/' + nextOrPrevious,
      success: (res) => {
        sCallBack(res)
      }
    })
  }

  isFirst(index){
    return index == 1 ? true : false;
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return latestIndex == index ? true : false;
  }

  _setLatestIndex(index){
    wx.setStorageSync('latest', index);
  }

  _getLatestIndex(){
    let index = wx.getStorageSync('latest');
    return index;
  }
}

export { ClassicModel }