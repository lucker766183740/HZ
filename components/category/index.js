// components/category/category.js
Component({
  properties: {
    optView:{
      type:Object,
      value:{},
      observer( newVal, oldVal, changeFn ){
        newVal.optViewList.forEach( item => {
          item.imgPath = `../../images/home/opt-view-0${item.productTypeId}.png`
        })
        this.setData({
          _optViewList: newVal.optViewList
        })
      }
    },
    optViewSingle:{
      type:Object,
      value:{
        isShow:false,
        imageUrl:'',
        desc:'',
        navigateUrl: ''
      }
    }
  },
  data: {
    _optViewList: [],
    imageList: [
      '../../images/home/opt-view-01.png',
      '../../images/home/opt-view-02.png',
      '../../images/home/opt-view-03.png'
    ]
  },
  methods: {
    gotoNavigate(e){
      let { index } = e.currentTarget.dataset
      let { optViewList } = this.properties.optView
      let navigateUrl = ''
      // 个人中心
      if( optViewList[index].navigateUrl ){
        navigateUrl = optViewList[index].navigateUrl
        let type = optViewList[index].type
        let title = optViewList[index].productTypeName
        wx.navigateTo({
          url: navigateUrl + '?title=' + title + '&type=' + type
        })
      }else{
        //navigateUrl = '/pages/manager/productList/productList'
        navigateUrl = '/pages/manager/pList/pList'
        let typeName =  optViewList[index].productTypeName
        let title = typeName.length > 2 ? typeName : (typeName + '产品' )
        let productTypeId = optViewList[index].productTypeId
        let url = navigateUrl + '?title=' + title + '&productTypeId=' + productTypeId
        wx.navigateTo({
          url: url,
        })
      }
    },
    gotoNavigateSingle(){
      let { navigateUrl } = this.properties.optViewSingle
      wx.navigateTo({
        url: navigateUrl,
      })
    }
  }
})
