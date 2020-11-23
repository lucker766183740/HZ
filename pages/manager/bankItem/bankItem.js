import visit from '../../../utils/request'

Page({
  data: {
    templateType: 0,
    InforMationList:[],  // 领导讲话
    imgUrls: [],  //
    advertisingList:[],  // 广告
    homeNews:{
      speech:'true'
    }, 
    category:{
      headline:'产品类目',
      headlineShow:false,
      optViewList:[]
    },
    ware:{
      headline:'产品推荐',
      headlineShow:false,
      headlineAll:false,
      // navigateUrl:'/pages/manager/productList/productList',
      navigateUrl:'/pages/manager/pList/pList',
      wareList:[]
    },
    manager:{
      headline:'客户经理',
      headlineShow: false,
      headlineShow:false,
      type:'double-row',
      list:[]
    },  
    backOffice:{
      headline:'内勤人员',
      headlineShow: false,
      headlineShow:false,
      type:'double-row',
      list:[]
    },  
    shareData:{} ,
    shareImg:'',
    isShareBoxHiden: true
  },
  onLoad: function (options) {
    let { orgId, orgName } = options
    this._getTemplateType( this.data.templateType )   // 版面类型
    this._getAdvertisingList()
    this._getInforMation()    // 领导讲话
    this._getproTypeList( orgId )   // 产品类目
    this._getproShelves( orgId )    // 产品推荐
    this._getManagerList( orgId )   // 客户经理   
    wx.setNavigationBarTitle({
      title: orgName 
    })       
    this.setData({
      orgId: orgId
    })
  },  
  // 0-0.获取版面类型
  _getTemplateType(orgId){
    let url = visit.appUrl + '/app/pro/orgtypographyByOrgId/' + orgId
    visit.request_application_get(url,{      
    }, res => {
      if( res.statusCode === 200 && res.data.length > 0 ){
        let resData = res.data[0]
        this.setData({
          templateType: resData.templateType
        })
      }
    })
  },  
  // 0.获取资讯-领导讲话
  _getInforMation(){
    let url = visit.appUrl + '/app/financialList'
    visit.request_n_post( url, {}, (result) => {
      if( result.statusCode === 200 && result.data.code === 0 ){
        let resData = result.data.data
        this.setData({
          InforMationList: resData
        })
      }
    })
  },  
  // 1. 获取广告信息
  _getAdvertisingList(){
    let url = visit.appUrl + '/app/advertisingList'
    visit.request_n_post( url, {}, (result) => {
      if( result.data.code === 0 ){
        let resData = result.data.data
        let imgList = []
        resData.forEach( item => {
          imgList.push( visit.appUrl + item.path)
        })
        this.setData({
          imgUrls: imgList,
          advertisingList: resData
        })
      }
    })
  },
  // 2.产品类目
  _getproTypeList( orgId ){
    let url = visit.appUrl + '/app/proTypeList'
    visit.request_n_post(url, {
      orgId: orgId
    }, (result) => {
      if( result.statusCode === 200 && result.data.code === 0 ){
        let resData = result.data.data
        let { category } = this.data
        category.optViewList = resData
        category.headlineShow = true
        this.setData({
          category: category
        })
      }
    })
  },
  // 3.产品推荐 - 已上架产品
  _getproShelves( orgId ){
    let url = visit.appUrl + '/app/pro/proShelvesByOrgId'
    visit.request_n_post(url, {
      isRecommend: 1,
      orgId: orgId
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
        ware.orgId = this.data.orgId
        this.setData({
          ware: ware
        })
      }
    })
  },
  // 4.客户经理 - 列表
  _getManagerList( orgId ){
    let url = visit.appUrl + '/app/user/org/'+ orgId
    visit.request_application_get(url, {
    }, (result) => {
      if( result.statusCode === 200 && result.data.code === 0 ){
        let resData = result.data.data
        resData.forEach( item => {
          item.avatarUrl = item.avatarUrl ? (visit.appUrl + item.avatarUrl) : ('/images/home/manager-header.png')
        })
        let resNQ = resData.filter(item=>item.roleBelong === '内勤人员')
        resData = resData.filter(item=>item.roleBelong === '客户经理')
        if(resData.length){
          let { manager } = this.data
          manager.list = resData
          manager.headlineShow = true
          this.setData({
            manager: manager
          })
        }
      
        if(resNQ.length){
          let { backOffice } = this.data
          backOffice.list = resNQ
          backOffice.headlineShow = true
          this.setData({
            backOffice: backOffice
          })
        }
      }
    })
  },

  
  // 9.获取二维码
  _getWxacodeunlimit(){
    let url = visit.appUrl + '/app/getShareInfo'
    let { orgId } = this.data
    let scene = `orgId=${orgId}`
    // this._setShareData()
    visit.request_n_post( url, {
      page: 'pages/manager/bankItem/bankItem',
      scene: scene,
      width: 300,
      auto_color: false  
    }, (result) => {
      if( result.statusCode === 200 && result.data.code === 0 ){
        let path = result.data.path
        let qrCode = visit.appUrl + '/smallapple/QrCode/' + path
        this.setData({
          shareImg: qrCode,
          isShareBoxHiden: false
        },()=>{
          this._setShareData()          
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
  // 设置 分享参数
  _setShareData(){
    let { imgUrls, category, InforMationList, ware } = this.data
    let categoryList = []
    let InforMation = []
    let wareData = {}
    category.optViewList.length && category.optViewList.forEach( item => {
      categoryList.push( item.productTypeName )
    })
    InforMationList.length && InforMationList.forEach( item => {
      InforMation.push( item.financialName )
    })
    wareData = {
      name: ware.wareList.length && ware.wareList[0].productName,
      keyWord: ware.wareList.length && ware.wareList[0].productKeyword,
      rate: ware.wareList.length && ware.wareList[0].qiriAnnualized,
      startAmount: ware.wareList.length && ware.wareList[0].startAmount,
      time: ware.wareList.length && ware.wareList[0].loanTimeLimit
    }
    
    let shareData = {
      adverImg : imgUrls.length ? imgUrls[0] : '',  // 1.广告
      category: categoryList,   // 2.类目
      InforMation: InforMation.splice(0,2),    // 3.讲话
      ware: wareData,    // 4.推荐
      // manager: manager.list,    // 5.客户经理
    }
    this.setData({
      shareData: shareData
    })    
  },
  
  // 分享 - 朋友圈
  handerShareBoxShow(){
    this._getWxacodeunlimit()
  },
  // 分享 - 好友
  onShareAppMessage(res){
    console.log('转发成功')
  }

})