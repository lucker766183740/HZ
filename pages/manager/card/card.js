import visit from '../../../utils/request.js'
// import { getAccessToken, setWxacodeunlimit } from '../../../utils/config'

Page({
  data: {
    manager:{
      type: 'card'
    },    
    state: false, // 小心心状态
    fabulous:{},
    managerShareImg: '',
    imgUrls:[],  // 广告-轮播
    productRecommendList:{
      headline:'推荐产品',
      headlineShow:false,
      headlineAll:true,
      managerId: '0',
      orgId: '0',
     // navigateUrl:'/pages/manager/productList/productList',
      navigateUrl:'/pages/manager/pList/pList',
      wareList:[]
    },  
    productOtherList:{
      headline:'其他产品',
      headlineShow:false,
      headlineAll:true,
      managerId: '0',
      orgId: '0',
     // navigateUrl:'/pages/manager/productList/productList',
      navigateUrl:'/pages/manager/pList/pList',
      wareList:[]
    }, 
    isShareBoxHiden: true,  // 微名片分享弹出框 
  },
  onLoad: function (options) {
    let { managerId, orgId } = options
    this._getAdvertisingList()
    this._addManagerToProductList( managerId )
    this._getManagerDetail( managerId )
    this.setData({
      managerId: managerId,
      orgId: orgId
    })
    // this._addManagerToProductList( 4 )
    // this._getManagerDetail( 4 )
  },

  //组件内点赞
  triggerFabulous(e){
    e.detail ? this._postManagerLike() : this._postManagerDisLike()
  },
  // 修改数据 managerId
  _addManagerToProductList( managerId ){
    let { productRecommendList, productOtherList } = this.data
    productRecommendList.managerId = managerId
    productOtherList.managerId = managerId
    this.setData({
      productRecommendList: productRecommendList,
      productOtherList: productOtherList
    })
  },

  // 数据获取 - 1.获取微名片信息
  _getManagerDetail( managerId ){
    let url = visit.appUrl + '/app/card/' + managerId
    visit.request_n_get(url, {
    }, (result) => {
      
      if(result.data ){
        let resData = result.data
        console.log('--------------------------------------')
        console.log( resData )
        if( !resData.managerId ){
          this._filterTokenTimeOut()
        }
        let manager = {
          type: 'card',
          name: resData.realName,
          managerId: resData.managerId,
          formId: resData.businessCardId,
          phone: resData.mobile,
          wechat: resData.wechat || resData.mobile,
          orgName: resData.orgName || '',
          photoStr: resData.photoStr ? ( visit.appUrl + '/smallapple/'+ resData.photoStr ) : ( 'https://xcx.bjhrsoft.com:8282/renren-fast/smallapple/1/1600226712397/u=1097730801,2864420848&fm=26&gp=0.jpg' )
        }
        // 数据过滤 
        let { productRecommendList } = this.data
        let { productOtherList } = this.data
        resData.recommendedProductsList.forEach( item => {
          if(item.coverPath === null || item.coverPath === undefined){
            item.coverPath = '../../images/bank/manager-back.png'
          }else{
            item.coverPath = visit.appUrl + item.coverPath 
          }
          if(item.clickCount > 999){ 
            item.clickCount = "999+"
          }
        })
        resData.otherProductsList.forEach( item => {
          if(item.coverPath === null || item.coverPath === undefined){
            item.coverPath = '../../images/bank/manager-back.png'
          }else{
            item.coverPath = visit.appUrl + item.coverPath 
          }
          if(item.clickCount > 999){ 
            item.clickCount = "999+"
          }
        })
        productRecommendList.wareList = resData.recommendedProductsList
        if( resData.recommendedProductsList && resData.recommendedProductsList.length ){
          productRecommendList.headlineShow = true
        }
        productOtherList.wareList = resData.otherProductsList
        if( resData.otherProductsList && resData.otherProductsList.length ){
          productOtherList.headlineShow = true
        }
    
        this.setData({
          manager: manager,
          businessCardId: resData.businessCardId,
          adList: resData.adList,
          productRecommendList: productRecommendList,
          productOtherList: productOtherList
        },()=>{
          this._postClickCount()
          this._getManagerLikes()
          this._getFollowFocus( resData.businessCardId )
        })
      }
    })
  },
  // 判断处理 - 用户token是否过期
  _filterTokenTimeOut(){
    visit.showParamsNot('身份验证不通过，请重新登录')
    setTimeout( () => {
      wx.clearStorageSync('loginMsg')
      wx.clearStorageSync('userInfo')
      wx.clearStorageSync('token')
      wx.navigateTo({
        url:'/pages/home/auth/auth'
      })
    })
  },
  // 数据获取 - 2.进入微名片触发数据更新
  _postClickCount(){
    let userId = wx.getStorageSync('userInfo').userId
    let { manager } = this.data
    let url = visit.appUrl + '/app/wxforwardinginfo/save'
    visit.request_n_post(url, {
      clickCount: 0,
      createby: userId,
      formId: manager.formId,
      managerId: manager.managerId,
      orgId: 0,
      tabType: "2",
      type: 2
    }, (result) => {
      if( result.data.code === 0 ){     
        this._getManagerClickTop()
      }      
    })
  },
  //  数据获取 - 3.最近访问 
  _getManagerClickTop(){
    let url = visit.appUrl + '/app/wxforwardinginfo/clickTop'
    visit.request_n_get(url, {
      formId: this.data.manager.formId,
      top: 10,
      type: 2
    }, (result) => {
      if( result.data.code === 0 ){
        let resData = result.data
        let fabulous = {
          count: resData.count,
          topList: resData.list
        }
        this.setData({
          fabulous: fabulous
        })
      }
    })
  },
  // 数据获取 - 4.点赞量
  _getManagerLikes(){
    let url = visit.appUrl + '/app/wxforwardinginfo/likeCount/' +  this.data.manager.formId + '/2'
    visit.request_n_get(url, {
    }, (result) => {
      if( result.data.code === 0 ){
        this.setData({
          count: result.data.count
        })
        this._getManagerWhetherLike()
      }
    })
  },
  // 数据获取 - 5.是否点赞
  _getManagerWhetherLike(){
    let userId = wx.getStorageSync('userInfo').userId
    let url = visit.appUrl + '/app/wxforwardinginfo/whetherLike'
    visit.request_n_get(url, {
      formId:  this.data.manager.formId,
      createby: userId,
      type: 2
    }, (result) => {
      if( result.data.code === 0 ){
        let whetherLike = result.data.whetherLike
        this.setData({
          whetherLike: whetherLike
        })
      }
    })
  },
  
  // 数据提交 - 6.点赞申请
  _postManagerLike(){
    let userId = wx.getStorageSync('userInfo').userId
    let url = visit.appUrl + '/app/wxforwardinginfo/like'
    visit.request_n_post(url, {
      formId: this.data.manager.formId,
      type: 2,
      createby: userId,
      tabType:4,
      managerId: this.data.manager.managerId,
      orgId:'',
      clickCount:''
    }, (result) => {
      if( result.data.code === 0 ){
        this.setData({
          whetherLike: true,
          count: result.data.count
        })
      }
    })
  },
  // 数据提交 - 7.取消点赞
  _postManagerDisLike(){
    let userId = wx.getStorageSync('userInfo').userId
    let url = visit.appUrl + '/app/wxforwardinginfo/disLike'
    visit.request_n_post(url, {
      createBy: userId,
      targetBy: this.data.manager.formId,
      type: 2
    }, (result) => {
      if( result.data.code === 0 ){
        this.setData({
          whetherLike: false,
          count: result.data.count
        })
      }
    })
  },
  // 3. 获取广告信息-轮播
  _getAdvertisingList(){
    let url = visit.appUrl + '/app/advertisingList'
    visit.request_n_post( url, {}, (result) => {
      if( result.data.code === 0 ){
        let data = result.data.data
        let imgList = []
        data.forEach( item => {
          imgList.push( visit.appUrl + item.path)
        })
        this.setData({
          imgUrls: imgList
        })
      }
    })
  },
  // 9.获取二维码
  _getWxacodeunlimit(){
    let url = visit.appUrl + '/app/getShareInfo'
    let { managerId, orgId } = this.data
    let scene = `managerId:${managerId}&orgId:${orgId}`
    visit.request_n_post( url, {
      page: 'pages/manager/qcard/qcard',
      scene: scene,
      width: 300,
      auto_color: false  
    }, (result) => {
      if(result.data.code === 0 ){
        let path = result.data.path
        let qrCode = visit.appUrl + '/smallapple/QrCode/' + path
        this.setData({
          managerShareImg: qrCode,
          isShareBoxHiden: false
        })
      }
    })
  },
  // 隐藏二维码
  triggerShareBoxHidden(e){
    this.setData({
      isShareBoxHiden: e.detail
    })
  },
  // 获取关注 - 用户是否关注了客户经理
  _getFollowFocus( businessCardId ){
    let url = visit.appUrl + '/app/focusList'
    visit.request_n_post(url,{
      customerId: wx.getStorageSync('userInfo').userId ,
      projectId: businessCardId,
      projectType: 1
    },res => {
      if(res.data.code === 0 ){
        let state = res.data.data.length ? true : false
        this.setData({
          state: state
        })
      }
    })
  },
  // 关注事件
  triggerHeartFocus(e){
    let state = e.detail
    let { businessCardId, orgId } = this.data
    state ? this._followFocusSuccess( state, businessCardId, orgId ) : this._followFocusCancel( state, businessCardId )
  },
  // 关注-成功
  _followFocusSuccess( state, businessCardId, orgId ){
    let url = visit.appUrl + '/app/saveCustomerFocus'
    visit.request_n_post(url,{
      customerId: wx.getStorageSync('userInfo').userId,
      orgId: orgId,
      projectId: businessCardId,
      projectType: 1
    },res => {
      console.log( res )
    })
    this.setData({
      state: state
    })
  },
  // 关注-取消关注
  _followFocusCancel( state, businessCardId ){
    let url = visit.appUrl + '/app/delFocus'
    visit.request_n_post(url,{
      projectId: businessCardId,
      projectType: 1,
      customerId: wx.getStorageSync('userInfo').userId
    },res => {
      console.log( res )
    })
    this.setData({
      state: state
    })
  },

  // 分享 - 朋友圈
  handerShareBoxShow(){
    this._getWxacodeunlimit()
  },
  // 分享 - 好友
  onShareAppMessage(res){
    let that = this
    let url = visit.appUrl + '/app/wxforwardinginfo/save'
    visit.request_n_post(url,{
      tabType:1,
      formId: that.data.manager.formId,
      type: 2,
      createby: wx.getStorageSync('userInfo').userId
    }, res => {
      console.log(res)
    })
  }

})