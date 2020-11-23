import visit from '../../../utils/request.js'

Page({
  data: {
    sessionKey: '',
    openId: '',
    mobile: '',
    rawData: '', 
    signature: '', 
    encryptedData: '', 
    iv: '',
    isShow: true
  },
  onLoad: function (options) {
    // wx.clearStorageSync()
    this._identified()
  },
  //手动输入手机号
  inputBasicViewText(e){
    let val = e.detail.value
    this.setData({
      mobile: val
    })
  },
  getPhoneNumber (e) {
    console.log( e )
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      visit.showLogin( '正在授权，请稍等...' )
      let { rawData, signature, encryptedData, iv } = e.detail
      this.setData({
        rawData: rawData, 
        signature: signature, 
        encryptedData: encryptedData, 
        iv: iv
      },()=>{
        this._getUserInfo()   
      })
    } else {  
      //用户按了拒绝按钮
      wx.switchTab({
        url: '/pages/home/home',
      })
      // wx.showModal({
      //   title: '警告',
      //   content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
      //   showCancel: false,
      //   confirmText: '返回授权',
      //   success: function(res) {
      //     if (res.confirm) {
      //       console.log('用户点击了“返回授权”');
      //     }
      //   }
      // });
    }
  },
  // 获取用户授权
  _getUserInfo(){
    var that = this;
    let wxLoginUrl = visit.appUrl + '/app/wxLogin?code='
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              wx.login({
                success: res => {
                  wx.request({
                    url: wxLoginUrl + res.code,
                    data:{},
                    method: 'POST',
                    success: res => {
                      if( res.data.code === 0 ){
                        that.setData({
                          sessionKey: res.data.sessionKey,
                          openId: res.data.openId,
                          isShow: false
                        },()=>{                           
                          wx.hideToast();
                        })
                      }else{                         
                        wx.hideToast();
                        visit.showParamsNot( res.data.msg )
                      }
                    }
                  })
                }
              });
            }
          });
        } else {
          // 用户没有授权
        }
      }
    });
  },
  // 登录 
  requestLogin(){
    let loginUrl = visit.appUrl + '/app/login'
    let { openId, sessionKey, mobile, rawData, signature, encryptedData, iv } = this.data
    wx.setStorageSync('loginMsg', this.data)
    visit.showLogin( '正在登录，稍等...' )
    visit.request_n_post(loginUrl,{
      encryptedData: encryptedData,
      iv: iv,
      mobile: mobile,
      openId: openId,
      rawData: rawData,
      sessionKey: sessionKey,
      signature: signature
    },(result) => {
      if( result.data.code === 0 ){
        wx.setStorageSync('userInfo', result.data.userInfo)
        wx.setStorageSync('token', result.data.token)
        wx.switchTab({
          url: '/pages/home/home',
        })        
        wx.hideNavigationBarLoading();
      }
    })
  },  
  
  //判断是否授权登录
  _identified(){
    let userInfo = wx.getStorageSync('userInfo')
    let token = wx.getStorageSync('token')
    if( userInfo && token ){
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
  }
})