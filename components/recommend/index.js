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
      wx.navigateTo({
        url: '/pages/manager/productDetail/productDetail?params=' + paramsJson,
      })
    }
  }
})
