import visit from '../../utils/request.js'
Component({
  properties: {
    recommend:Object
  },
  data: {

  },
  methods: {
    gotoProductDetail(e){
    console.log( '-------------------------------------' )
      let { index } = e.currentTarget.dataset
      let { recommend } = this.properties
      let item = recommend.wareList[index]
      console.log( this.properties )
      let params = {
        wxProductId: item.wxProductId,
        orgId: recommend.orgId,
        managerId: recommend.managerId
      }
      let paramsJson = JSON.stringify( params )
      
      //添加访问量
    let userId = wx.getStorageSync('userInfo').userId
    let url = visit.appUrl + '/app/wxforwardinginfo/save'
    visit.request_n_post(url, {
      formId: item.wxProductId,
      orgId: recommend.orgId,
      type: 1,
      createby: userId,
      tabType: 2
    }, (result) => {
      if( result.data.code === 0 ){
      }
    })
    wx.navigateTo({
      url: '/pages/home/details/details?params=' + paramsJson,
    })
    }
  }
})
