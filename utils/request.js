// const appUrl = 'http://DESKTOP-TCC15SS:8282/renren-fast'  // 李鹏
// const appUrl = 'http://localhost:8282/renren-fast'  // 王立
// const appUrl = 'https://xcx.gmncsyyh.com:8282/renren-fast'
const appUrl = 'https://xcx.bjhrsoft.com:8282/renren-fast'

// POST请求无loding
function request_n_post(url, data, cb) {
  let dataType = Object.assign(data)
  let token = wx.getStorageSync('token')
  wx.request({
    url: url,
    data: dataType,
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "token": token
    }, // 设置请求的 header
    success: function (res) {
      cb(res, null);
    },
    fail: function (res) {
      cb(null, res)
      wx.hideLoading();
    }
  })
}
// POST请求-jsonString
function request_post_jsonString(url, data, cb) {
  let token = wx.getStorageSync('token')
  wx.request({
    url: url,
    data: data,
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "token": token
    }, // 设置请求的 header
    success: function (res) {
      cb(res, null);
    },
    fail: function (res) {
      cb(null, res)
      wx.hideLoading();
    }
  })
}
//GET请求无loading
function request_n_get(url, data, cb) {
  let dataType = Object.assign(data, { appType: 'wx' })
  let token = wx.getStorageSync('token')
  wx.request({
    url: url,
    data: dataType,
    method: 'GET',
    header: {
      'content-type': 'application/json',
      "token": token
    },
    success(res) {
      cb(res, null);
    },
    fail(err) {
      cb(null, err);
      wx.hideLoading();
    }
  })
}
//GET请求-application
function request_application_get(url, data, cb) {
  let dataType = Object.assign(data, { appType: 'wx' })
  let token = wx.getStorageSync('token')
  wx.request({
    url: url,
    data: dataType,
    method: 'GET',
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      "token": token
    },
    success(res) {
      cb(res, null);
    },
    fail(err) {
      cb(null, err);
      wx.hideLoading();
    }
  })
}


// 登录等待
const showLogin = ( title ) => {
  wx.showToast({
    title: title,
    mask: true,
    duration: 60000, //延迟时间
    icon: 'loading'
  })
}
// 参数未传
const showParamsNot = ( title ) => {
  wx.showToast({
    title: title,
    mask: true,
    duration: 2000, 
    icon: 'none'
  })
}
// 用户是否授权
const isAuthFn = () => {
  let userInfo = wx.getStorageSync('userInfo')
  let token = wx.getStorageSync('token')
  let isAuth = ( userInfo && token ) ? true : false
  return isAuth
}

module.exports = {
  appUrl,
  request_n_post,
  request_post_jsonString,
  request_n_get,
  request_application_get,
  showLogin,
  showParamsNot,
  isAuthFn,
}


// 使用案例
// visit.request_n_get(url, {
//   userId: wx.getStorageSync('sessionMsg').user_id,
//   session_key: wx.getStorageSync('sessionMsg').session_key
// }, (result) => {
//   console.log( result )
// })