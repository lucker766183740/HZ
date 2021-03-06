import visit from '../../../utils/request'

Page({
  data: {    
    ware:{
      headlineShow:false,
      wareList:[]
    },
  },
  onLoad: function (options) {
    let { title, productTypeId } = options
    if(title && title.trim() !== ""){
      wx.setNavigationBarTitle({
        title: options.title
      })
    }
    this._getProductList( productTypeId )
  },
  _getProductList( typeId ){
    if( !typeId ){
      typeId = ''
    }
    let url = visit.appUrl + '/app/pro/proShelvesByOrgId'
    // let productTypeId = 
    visit.request_n_post(url, {
      isRecommend: '',
      orgId: 1,
      productTypeId: typeId
    }, (result) => {
      if( result.statusCode === 200 && result.data.length !== 0 ){
        let resData = result.data
        let { ware } = this.data
        ware.wareList = resData
        // ware.headlineShow = true
        this.setData({
          ware: ware
        })
      }
    })
  },
  
  // 分享 - 好友
  onShareAppMessage(res){
    console.log('转发成功')
  }
})