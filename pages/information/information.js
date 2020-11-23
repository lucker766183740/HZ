import visit from '../../utils/request'

Page({
  data: {
    list:[]
  },
  onLoad: function (options) {
    this._getInforMation()
  },
  _getInforMation(){
    let url = visit.appUrl + '/app/financialList'
    visit.request_n_post( url, {}, (result) => {
      console.log( result )
      if( result.statusCode === 200 && result.data.code === 0 ){
        let resData = result.data.data
        this.setData({
          list: resData
        })
      }
    })
  },
  bindInformationItem(e){
    let { index } = e.currentTarget.dataset
    let { list } = this.data
    let { financialId } = list[index]
    wx.navigateTo({
      //url: './informationDetail/informationDetail?id=' + financialId,
      url: '../../pages/content/content?id=' + financialId +'&type=1',
    })
  },
})