import visit from '../../../utils/request.js'

// 经理
let manager = [
  { title:'经理姓名', desc:'', type:'disable' },
  { title:'经理号牌', desc:'', type:'disable' },
  { title:'经理电话', desc:'', type:'disable' },
  { title:'公司地址', desc:'', type:'disable' }
]

let person = [
  { title:'客户姓名', desc:'', type:'able' },
  { title:'身份证号', desc:'', type:'able' },
  { title:'客户电话', desc:'', type:'disable' },
  { title:'邮箱', desc:'', type:'able' },
  { title:'家庭住址', desc:'', type:'able' },
  { title:'客户号', desc:'', type:'disable' },
  // { title:'会员等级', desc:'黄金等级', type:'level' }
]


Page({
  data: {
    personMsg:{
    },
    basicView:{
      type:'person',
      list:[]
    }, 
    userId: '',
    isButtonShow: true
  },
  onLoad: function (options) {
    this._identityUserType()
  },
  
  // 获取用户身份 - 判断用户
  _identityUserType(){
    let userInfo = wx.getStorageSync('userInfo')
    let { userId, realName, mobile, wxAddress, idCard, email, registrationType } = userInfo
    let { basicView, isButtonShow } = this.data
    if( registrationType === 0 ){
      manager[0].desc = realName
      manager[1].desc = userId
      manager[2].desc = mobile
      manager[3].desc = wxAddress || '青岛市即墨区'
      basicView.list = manager
      isButtonShow = false
    } else {
      person[0].desc = realName || '请输入您的姓名'
      person[1].desc = idCard || '请完善身份证号'
      person[2].desc = mobile
      person[3].desc = email || '请完善邮箱'
      person[4].desc = wxAddress || '请完善家庭住址'
      person[5].desc = userId
      basicView.list = person
    }
    this.setData({
      basicView: basicView,
      userId: userId,
      isButtonShow: isButtonShow
    })
  },
  referEditVal(e){
    let { val, index } = e.detail
    let { basicView } = this.data
    basicView.list[index].desc = val
    this.setData({
      basicView: basicView
    })
  },
  submitPersonel(){
    let off = true
    let url = visit.appUrl + '/app/user/update'
    let { basicView, userId } = this.data
    let { list } = basicView
    let formData = {
      realName: list[0].desc !== '请输入您的姓名' ? list[0].desc : '',
      idCard: list[1].desc !== '请完善身份证号' ? list[1].desc : '',
      email: list[3].desc !== '请完善邮箱' ? list[3].desc : '',
      wxAddress: list[4].desc !== '请完善家庭住址' ? list[3].desc : ''
    }
    console.log( formData )
    if( !formData.realName ){
      visit.showParamsNot('请输入您的姓名')
      off = false
    }
    if( !formData.idCard ){
      visit.showParamsNot('请完善身份证号')
      off = false
    }
    if( !formData.email ){
      visit.showParamsNot('请完善邮箱')
      off = false
    }
    if( !formData.wxAddress ){
      visit.showParamsNot('请完善家庭住址')
      off = false
    }

    if( !off ) return false
    visit.request_n_post(url, {
      userId: userId,
      realName: formData.realName,
      email: formData.email,
      idCard: formData.idCard,
      wxAddress: formData.wxAddress 
    }, (result) => {
      console.log( result )
      if( result.statusCode === 200 && result.data.code === 0 ){
        // showParamsNot('个人资料修改成功')
        // setTimeout(()=>{
        //   wx.navigateBack({
        //     delta: 1,  // 返回上一级页面。
        //     success: function() {
        //         console.log('成功！')
        //     }
        //   })
        // },1000)
        this._requestLogin()
      }
    })
  },
  //退出
  handleSignOut(){
    let that = this;
    wx.showModal({
      content: '确定要退出吗？',
      confirmText: '确定',
      cancelText: '取消',
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '注销中',
          });
          wx.hideToast()
          wx.removeStorageSync('userInfo')
          wx.removeStorageSync('token')
          // wx.clearStorage();
          wx.reLaunch({
            url: '/pages/home/auth/auth'
          })
        }
      }
    });
  },
  
  // 登录 
  _requestLogin(){
    let loginUrl = visit.appUrl + '/app/login'
    let { openId, sessionKey, mobile, rawData, signature, encryptedData, iv } = wx.getStorageSync('loginMsg')
    visit.showLogin( '个人资料修改成功' )
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
        wx.navigateBack({
          delta: 1,  // 返回上一级页面。
          success: function() {
              console.log('成功！')
          }
        })     
        wx.hideNavigationBarLoading();
      }
    })
  },  
})