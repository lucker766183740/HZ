import localtionFn from '../../utils/localtion.js'
import visit from '../../utils/request'

Page({
  data: {
    isAuth: false,  //用户授权
    templateType: 0,
    advertisingList:[],  // 广告
    imgUrls: [],
    imageTextSection:{
      isShow: false,
      imageTextList:[]
    },
    videoSection:{
      isShow: false,
      videoList:[]
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
      managerId: 1,
      orgId: 1,
      // navigateUrl:'/pages/manager/productList/productList',
      navigateUrl:'/pages/manager/pList/pList',
      wareList:[]
    },
    manager:{
      headline:'明星客户经理',
      headlineShow:false,
      type:'star',
      orgId: 0,
      list:[]
    },
    bankStar:{
      headline:'优秀支行',
      headlineShow:false,
      bankList:[],
    },
    bankOther:{
      headline:'其他支行',
      headlineShow:false,
      headlineAll:false,
      navigateUrl:'/pages/manager/bankList/bankList',
      list:[]
    },
    InforMationList:[],
    openTime:'09:00:00',  // 定位开启时间
    endTime: '18:00:00',  // 定位结束时间
    delay: 0.5,  // 定位抓取间隔时间(分)
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this._identityManager()    // 定位
    this._getTemplateType( this.data.templateType )
    this._getImageTextList()      // 图文
    // this._getVideoList()          // 视频
    this._getproTypeList()        // 产品类目
    this._getproShelves()         // 产品推荐
    this._getManagerStar()        // 明星客户经理
    this._getExcellentBankList()  // 优秀支行
    this._getOtherBankList()      // 其他支行
    // this._testLocalArr()
    this._getAdvertisingList()    // 广告

    this._getInforMation()  // 资讯
  },
  // dot 轮播图，
  swiperChange: function (e) {
    if (e.detail.source == "touch") {
      this.setData({
        swiperCurrent: e.detail.current
      })
    }
  },
  //index值
  handleChange(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },

  // 测试数据
  _testLocalArr(){
    let arr = [
      {latitudeNum: "34.294903", longitudeNum: "108.946976", trackEventsId: 0, trackTime: "17:37:39", userId: 4},
      {latitudeNum: "34.294945", longitudeNum: "108.946945", trackEventsId: 0, trackTime: "17:38:15", userId: 4},
      {latitudeNum: "34.294941", longitudeNum: "108.946945", trackEventsId: 0, trackTime: "17:38:45", userId: 4},
      {latitudeNum: "34.294956", longitudeNum: "108.946930", trackEventsId: 0, trackTime: "17:39:17", userId: 4},
      {latitudeNum: "34.294941", longitudeNum: "108.946922", trackEventsId: 0, trackTime: "17:39:52", userId: 4},
      {latitudeNum: "34.294922", longitudeNum: "108.946953", trackEventsId: 0, trackTime: "17:40:23", userId: 4},
    ]
    wx.setStorageSync('localtionArr', arr)
  },
  // 0.获取资讯
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

  // 0.获取版面类型
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
  

  // 定位- 1.判断用户身份
  _identityManager(){
    let { registrationType } = wx.getStorageSync('userInfo')
    if( registrationType == 0 ){
      localtionFn.getLocaltion( res => {
        let { openTime, endTime, delay } = this.data
        localtionFn.managerBackgroundLocation( openTime, endTime, delay )
      })
    }
  },
  
  // 2. 获取广告信息
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
  // 3.1 获取其他信息 - 图文
  _getImageTextList(){
    let url = visit.appUrl + '/app/otherShowList'
    visit.request_n_post( url, {}, (result) => {
      if( result.statusCode === 200 && result.data.code === 0 ){
        let resData = result.data.data
        if( resData.length === 0 ) return 
        let { imageTextSection } = this.data
        if(resData.length){
          imageTextSection.isShow = true
          imageTextSection.imageTextList = resData
          this.setData({
            imageTextSection: imageTextSection
          })
        }
      }
    })
  },
  // 3.2 获取其他信息 - 视频
  _getVideoList(){
    let url = visit.appUrl + '/app/videoList'
    visit.request_n_post( url, {}, (result) => {
      if( result.statusCode === 200 && result.data.code === 0 ){
        let resData = result.data.data
        if( resData.length === 0 ) return 
        let { videoSection } = this.data
        videoSection.videoList = resData
        videoSection.isShow = true
        this.setData({
          videoSection: videoSection
        })
      }
    })
  },
  // 4.产品类目
  _getproTypeList(){
    let url = visit.appUrl + '/app/proTypeList'
    visit.request_n_post(url, {
      orgId: 1
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
  // 5.产品推荐 - 已上架产品
  _getproShelves(){
    let url = visit.appUrl + '/app/pro/proShelvesByOrgId'
    visit.request_n_post(url, {
      isRecommend: 1,
      orgId: 1
    }, (result) => {
      if( result.statusCode === 200 && result.data.length !== 0 ){
        let resData = result.data
        let { ware } = this.data
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
        console.log(resData)
        ware.wareList = resData
        ware.headlineShow = true
        ware.headlineAll = true
        this.setData({
          ware: ware
        })
      }
    })
  },
  // 6.获取明星客户经理
  _getManagerStar(){
    let url = visit.appUrl + '/app/starManagerList'
    visit.request_n_post(url, {
    }, (result) => {
      if( result.statusCode === 200 && result.data.code === 0 ){
        let resData = result.data.data
        if( resData.length === 0 ) return 
        let { manager } = this.data
        let list = []
        resData.forEach( item => {
          let managerItem = {
            name: item.realName,
            job:'客户经理',
            managerId: item.customerManagerId,
            phone: item.mobile,
            company: item.name,
            headerImg: visit.appUrl + item.path,
            navigateUrl:'/pages/manager/card/card'
          }
          list.push( managerItem )
        })
        manager.list = list
        manager.orgId = 1
        manager.headlineShow = true
        this.setData({
          manager: manager
        })
      }
    })
  },
  // 7.优秀支行
  _getExcellentBankList(){
    let url = visit.appUrl + '/app/excellentBankList'
    visit.request_n_post(url, {
    }, (result) => {
      if( result.statusCode === 200 && result.data.code === 0 ){
        let resData = result.data.data
        let { bankStar } = this.data
        bankStar.bankList = resData
        bankStar.isShow = true
        bankStar.headlineShow = true
        this.setData({
          bankStar: bankStar
        })
      }
    })
  },
  // 8.其他支行
  _getOtherBankList(){
    this._saveLog()
    let url = visit.appUrl + '/app/otherOrgList'
    visit.request_n_post(url, {
    }, (result) => {
      if( result.statusCode === 200 && result.data.code === 0 ){
        let resData = result.data.data
        let { bankOther } = this.data
        bankOther.list = resData
        bankOther.isShow = true
        bankOther.headlineShow = true
        bankOther.headlineAll = true
        this.setData({
          bankOther: bankOther
        })
      }
    })
  },
   // 9.添加登录日志
  _saveLog(){
    let { username } = wx.getStorageSync('userInfo')
    let { nickName } = wx.getStorageSync('userInfo')
    let url = visit.appUrl + '/app/saveLoginLog'
    visit.request_n_post(url,{
      username: username,
      name: nickName,
      operation: '登录'
    },(result)=>{
     // console.log( result )
    })
  },
 
  // 分享 - 好友
  onShareAppMessage(res){
    console.log('转发成功')
  }
  
})