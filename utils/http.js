import { config } from '../config.js'
const tips = {
  1: '',
  1005: 'appkey',
  3000: ''
}

class HTTP {
  request(params) {
    if (!params) {
      params.method = 'GET';
    }
    wx.request({
      url: config.api_base_url + params.url,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      method: params.method,
      success: (res) => {
        let code = res.statusCode.toString();
        if (code.startsWith('2')) {
          params.success(res.data)
        } else {
          let error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail: (err) => {
        this._show_error(1);
      },
      complete: function (res) { },
    })
  }

  _show_error(error_code) {
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export {HTTP}
