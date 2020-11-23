Component({
  properties: {
    headline: String,
    headlineAll:Boolean,
    navigateUrl:String
  },
  data: {

  },
  methods: {
    gotoNavigate(e){
      let { navigateUrl } = this.properties
      console.log( navigateUrl )
      let url = ''
      if( navigateUrl.indexOf('productList') !== -1 ){
        url = navigateUrl + '?title='
      }else{
        url = navigateUrl
      }
      wx.navigateTo({
        url:url
      })
    }
  }
})
