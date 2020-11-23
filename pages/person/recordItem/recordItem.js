import visit from '../../../utils/request'
import util from '../../../utils/util'

Page({
  data: {
    basicView:{
      type:'retained',
      list:[
        { title:'购买人', desc:'' },
        { title:'客户电话', desc:'' },
        { title:'身份证号', desc:'' },
        { title:'购买时间', desc:'' },
        { title:'购买金额', desc:'' },
        { title:'购买产品', desc:'' },
        // { title:'产品编号', desc:'JYD-WD-001' },
        { title:'产品详情', desc:'' },
        { title:'到期时间', desc:'' },
        { title:'客户经理', desc:'' },
        { title:'员工电话', desc:'' },
        { title:'支行地址', desc:'' }
      ]
    }
  },
  onLoad: function (options) {
    console.log( options.id )
    this._getRecordItem( options.id )
  },
  _getRecordItem( id ){
    let url = visit.appUrl + '/app/getProById'
    visit.request_n_post(url,{
      wx_product_id: id
    }, res => {
      console.log( res )
      if( res.statusCode === 200 && res.data.code === 0 ){
        let userInfo = wx.getStorageSync('userInfo')
        let basicView = this.data.basicView
        let resData = res.data.data
        basicView.list[0].desc = userInfo.realName
        basicView.list[1].desc = userInfo.mobile
        basicView.list[2].desc = userInfo.idCard
        basicView.list[3].desc = util.formatYearMonthDay( resData.shelvesStartTime || Date.now() )
        basicView.list[4].desc = ''
        basicView.list[5].desc = resData.productName
        basicView.list[6].desc = resData.productInstructions.slice(0,13)
        basicView.list[7].desc = util.formatYearMonthDay( resData.shelvesEndTime || Date.now() )
        basicView.list[8].desc = resData.riskLev
        basicView.list[9].desc = resData.investmentHorizon
        basicView.list[10].desc = resData.riskWarn
        this.setData({
          basicView: basicView
        })
      }
    })
  }
})