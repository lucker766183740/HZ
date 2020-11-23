import visit from '../../utils/request'
Component({
  properties: {
    bankStar:{
      type:Object,
      value:{},
      observer( newVal, oldVal, changeFn ){
        if( JSON.stringify( newVal ) !== "{}" ){
          newVal.bankList.forEach( item => {
            if(item.path){
              item.imgPath = visit.appUrl + item.path
            }
          })
          this.setData({
            _bankList: newVal.bankList
          })
        }
      }
    },
    bankOther:{
      type:Object,
      value:{},
      observer( newVal, oldVal, changeFn ){
        if( JSON.stringify( newVal ) !== "{}" ){
          newVal.list.forEach( item => {
            if(item.path){
              item.path = visit.appUrl + item.path
            }
          })
          this.setData({
            _otherBankList: newVal.list
          })
          console.log(newVal.list)
        }
      }
    },
    //bankOther:Object,
    bankOtherStage: Object
  },
  data: {
    _bankList: [],
    _otherBankList: []
  },
  methods: {
    gotoNavigate(e){
      let { id, orgname } = e.currentTarget.dataset
      console.log( '优秀', e.currentTarget.dataset )
      let navigateUrl = '/pages/manager/bankItem/bankItem'
      wx.navigateTo({
        url: navigateUrl + '?orgId=' + id + '&orgName=' + orgname,
      })
    },
    gotoNavigateItem(e){
      let navigateUrl = '/pages/manager/bankItem/bankItem'
      let { list } = this.properties.bankOther
      let { index, orgname } = e.currentTarget.dataset
      let { orgId } = list[index]
      console.log( '其他', orgId, orgname )
      wx.navigateTo({
        url: navigateUrl + '?orgId=' + orgId + '&orgName=' + orgname,
      })
    }
  },
})
