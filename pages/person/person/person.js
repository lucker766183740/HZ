import visit from '../../../utils/request'
// 用户 - 客户
let customer = {
  optViewList:[ 
    {
      imageUrl:'../../images/home/opt-view-01.png',
      productTypeName:'我的产品',
      navigateUrl:'/pages/person/recordList/recordList',
      type:1
    },
    {
      imageUrl:'../../images/home/opt-view-02.png',
      productTypeName:'历史记录',
      navigateUrl:'/pages/person/recordList/recordList',
      type:2
    }
]}
let customerSingle = {
    isShow:true,
    imageUrl:'../../images/home/opt-view-03.png',
    productTypeName:'我关注的客户经理',
    navigateUrl:'/pages/person/focusList/focusList',
}
// 用户 - 经理
let manager = {
  optViewList:[
    // {
    //   imageUrl:'../../images/home/opt-view-01.png',
    //   productTypeName:'我的产品',
    //   navigateUrl:'/pages/manager/productList/productList'
    // },
    {
      imageUrl:'../../images/home/opt-view-02.png',
      productTypeName:'运动轨迹',
      navigateUrl:'/pages/manager/map/map'
    },
    {
      imageUrl:'../../images/home/opt-view-03.png',
      productTypeName:'客户留资',
      navigateUrl:'/pages/manager/retainedList/retainedList'
    },
    {
      imageUrl:'../../images/home/opt-view-04.png',
      productTypeName:'人员访问',
      navigateUrl:'/pages/manager/visitList/visitList'
    }
]}
let managerSingle = {
  isShow:false
}

Page({
  data: {
    // 用户
    personMsg:{
    },
    optView:{
      optViewList:[]  // 客户身份
    },
    optViewSingle:{},
    ware:{
      headline:'产品推荐',
      headlineShow:false,
      headlineAll:false,
      managerId: 1,
      orgId: 1,
     // navigateUrl:'/pages/manager/productList/productList',
      navigateUrl:'/pages/manager/pList/pList',
      wareList:[]
    },
  },
  onLoad: function (options) {
    let isAuth = visit.isAuthFn()
    if(isAuth){
      this._identityUserType()
      this._getproShelves()         // 产品推荐
    }else{
      wx.reLaunch({
        url: '/pages/home/auth/auth',
      })
    }
  },
  // 获取用户身份 - 判断用户
  _identityUserType(){
    let userInfo = wx.getStorageSync('userInfo')
    let { userId, realName, nickName, avatarUrl, registrationType } = userInfo
    let number = registrationType === 0 ? ('经理号: ' + userId) : ('ID: ' + userId)
    let level = registrationType === 0 ? '金牌经理' : '黄金会员'
    let optView = registrationType === 0 ? manager : customer
    let optViewSingle = registrationType === 0 ? managerSingle : customerSingle
    let personMsg = {
      name: nickName || '您还未填写姓名，请及时完善',
      number: number,
      level: level,
      headerImg: avatarUrl,
      tips: realName ? true : false,
      type: registrationType
    }
    this.setData({
      personMsg: personMsg,
      optView: optView,
      optViewSingle: optViewSingle
    })
  },  
  // 产品推荐
  _getproShelves(){
    let url = visit.appUrl + '/app/pro/proShelvesByOrgId'
    visit.request_n_post(url, {
      isRecommend: 1,
      orgId: 1
    }, (result) => {
      if( result.statusCode === 200 && result.data.length !== 0 ){
        let resData = result.data
        resData.forEach( item => {
          if(item.coverPath === null){
            item.coverPath = '../../images/bank/manager-back.png'
          }else{
            item.coverPath = visit.appUrl + item.coverPath 
          }
          if(item.clickCount > 999){ 
            item.clickCount = "999+"
          }
        })
        let { ware } = this.data
        ware.wareList = resData
        ware.headlineShow = true
        ware.headlineAll = true
        this.setData({
          ware: ware
        })
      }
    })
  },
  // 个人资料
  gotoPersonal(){
    wx.navigateTo({
      url: '../personal/personal',
    })
  },
  // 广告位
  gotoProductList(){
    wx.navigateTo({
      url: '/pages/manager/productList/productList?title=',
    })
  },

  // 客户 - 我的产品
  gotoMyRecordList(){
    wx.navigateTo({
      url: '/pages/person/recordList/recordList?title=我的产品&type=1',
    })
  },  
  // 客户 - 历史记录
  gotoHistoryRecordList(){
    wx.navigateTo({
      url: '/pages/person/recordList/recordList?title=历史记录&type=2',
    })
  },
  // 客户 - 关注的客户经理
  gotoCareForManager(){
    wx.navigateTo({
      url: '/pages/person/focusList/focusList',
    })
  },
  // 经理 - 运动轨迹
  gotoMap(){
    wx.navigateTo({
      url: '/pages/manager/map/map',
    })
  },
  // 经理 - 客户留资
  gotoCustomer(){
    wx.navigateTo({
      url: '/pages/manager/retainedList/retainedList',
    })
  },
  // 经理 - 人员访问
  gotoVisitList(){
    wx.navigateTo({
      url: '/pages/manager/visitList/visitList',
    })
  }
})