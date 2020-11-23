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
    isAuthShow: 1
  },
  onLoad: function (options) {
    this._identified()
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
        let authMsg = {
          rawData: e.detail.rawData,
          signature: e.detail.signature,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        }
        wx.setStorageSync('authMsg',authMsg)
        // console.log( authMsg)
      })
    } else {  
      //用户按了拒绝按钮      
      wx.switchTab({
        url: '/pages/home/home',
      })
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
                  visit.request_n_post(wxLoginUrl + res.code,{}, res => {
                    if( res.data.code === 0 ){
                      that.setData({
                        sessionKey: res.data.sessionKey,
                        openId: res.data.openId,
                        isAuthShow: 2
                      },()=>{ wx.hideToast();
                      })
                    }else{                         
                      wx.hideToast();
                      visit.showParamsNot( res.data.msg )
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
  // 未授权
  bindNoAuth(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },

  // 手机验证  
  getPhoneNumber (e) {
    var that = this;
    let wxLoginUrl = visit.appUrl + '/app/wxPhoneDecrypt'
    
    visit.request_n_get(wxLoginUrl,{
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      sessionKey: this.data.sessionKey
    }, res => {
      if( res.statusCode === 200 && res.data.code === 0 ){
        this.setData({
          mobile: res.data.phoneNumber
        },()=>{
          that.requestLogin()
        })
      }
    })
  },

  // 使用手机注册
  handleOtherMebile(){
    this.setData({
      isAuthShow: 3
    })
  },
  //手动输入手机号
  inputMobileNumber(e){
    let val = e.detail.value
    this.setData({
      mobile: val
    })
  },
  
  // 登录 
  requestLogin(){
    let loginUrl = visit.appUrl + '/app/login'
    let { openId, sessionKey, mobile, rawData, signature, encryptedData, iv } = this.data
    wx.setStorageSync('loginMsg', this.data)
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
        wx.hideToast();
      }
    })
  },  
  
  //判断是否授权登录
  _identified(){
    let userInfo = wx.getStorageSync('userInfo')
    let token = wx.getStorageSync('token')
    let authMsg = wx.getStorageSync('authMsg')
    if( userInfo && token ){
      wx.switchTab({
        url: '/pages/home/home',
      })
    }else if( authMsg ){
      this.setData({
        rawData: authMsg.rawData, 
        signature: authMsg.signature, 
        encryptedData: authMsg.encryptedData, 
        iv: authMsg.iv
      })
      this._getUserInfo()
    }
  }
})