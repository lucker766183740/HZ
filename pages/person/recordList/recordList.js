import visit from '../../../utils/request'

Page({
  data: {    
    ware:{
      wareList:[]
    },
    recordList:[]
  },
  onLoad: function (options) {
    let { title, type } = options
    let { userId } = wx.getStorageSync('userInfo')
    if(title && title.trim() !== ""){
      wx.setNavigationBarTitle({
        title: options.title
      })
    }
    this._getPersonProductList( userId, type )
  },
  // 数据获取
  _getPersonProductList( userId, type ){
    let assetsByUserUrl = visit.appUrl + '/app/getAssetsByUser'  // 我的产品 - 留资情况
    let historyListUrl = visit.appUrl + '/app/viewHistoryList'   // 历史记录
    let url = type == 1 ? assetsByUserUrl : historyListUrl
    visit.request_n_post(url, {
      userId: userId,
      customerId: userId
    }, (result) => {
      if( result.statusCode === 200 && result.data.length !== 0 ){
        let resData = result.data.data
        this.setData({
          recordList: resData,
          type: type
        })
      }
    })
  },
  // 跳转详情
  gotoProductDetail(e){
    let { index } = e.currentTarget.dataset
    let { recordList, type } = this.data
    let { wxProductId } = recordList[index]
    let recordItemUrl =  '/pages/person/recordItem/recordItem?id=' + wxProductId
    let retainedDetailUrl = '/pages/manager/retainedDetail/retainedDetail'
    wx.navigateTo({
      url: '/pages/person/recordItem/recordItem?id=' + wxProductId,
    })
  }
})