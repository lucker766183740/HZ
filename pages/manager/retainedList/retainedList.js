import visit from '../../../utils/request'
import util from '../../../utils/util'

Page({
  data: {
    date:'',
    retainedList:[],
    isShow: false
  },
  onLoad: function (options) {
    this._getDateNowFn()
  },
  // 获取当前时间
  _getDateNowFn(){
    let date = util.formatYearMonth(new Date())
    this.setData({
      date: date
    },()=>{
      this._getAssetsList()
    })
  },
  // 时间选择
  triggerDateChange(e){
    let date = util.formatYearMonth( e.detail )
    this.setData({
      date: date
    },()=>{
      this._getAssetsList()
    })
  },
  // 获取客户留资情况
  _getAssetsList(){
    let managerId = wx.getStorageSync('userInfo').userId
    // let managerId = 2
    let url = visit.appUrl + '/app/getAssetsByManager'

    visit.request_n_post(url,{
      userId: managerId,
      registrationTime: this.data.date
    }, res => {
      if( res.statusCode === 200 && res.data.code === 0 ){
        let resData = res.data.data
        let list = []
        let isShow = false
        if( resData.length ){
          resData.forEach( item => {
            let items = {
              id: item.customerAssetsId,
              customer: item.customerName,
              product: item.productName,
              date: item.registrationTime,
              money: item.purchaseAmount || 0
            }
            list.push( items )
            isShow = true
          })
        }
        this.setData({
          retainedList: list,
          isShow: isShow
        })
      }
    })
  }
})