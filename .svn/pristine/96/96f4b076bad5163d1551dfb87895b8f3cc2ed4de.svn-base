import visit from '../../../utils/request'

Page({
  data: {
    bankOtherStage:{}
  },
  onLoad: function (options) {
    this._getOtherBankList()
  },
  
  _getOtherBankList(){
    let url = visit.appUrl + '/app/otherOrgList'
    visit.request_n_post(url, {
    }, (result) => {
      if( result.statusCode === 200 && result.data.code === 0 ){
        let resData = result.data.data
        let { bankOtherStage } = this.data
        bankOtherStage.list = resData
        bankOtherStage.isShow = true
        this.setData({
          bankOtherStage: bankOtherStage
        })
      }
    })
  },
  
  // 分享 - 好友
  onShareAppMessage(res){
    console.log('转发成功')
  }
})