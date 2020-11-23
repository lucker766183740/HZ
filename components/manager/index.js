Component({
  properties: {
    manager: Object,
    state: Boolean
  },
  data: {
    managerList:[]
  },
  attached(){
    // this._filterScore()
  },
  methods: {
    // _filterScore(){
    //   let { list, type } = this.properties.manager
    //   if( type !== 'card'){
    //     list.forEach( item => {
    //       item.scoreWidth = item.score * 17
    //     })
    //     this.setData({
    //       managerList: list
    //     })
    //   }
    // },
    calling(e){
      let phone = this.properties.manager.phone
      wx.makePhoneCall({
        phoneNumber: phone 
      })
    },
    wxCopy(e){
      let wechat = this.properties.manager.wechat
      wx.setClipboardData({
        data: wechat,
        success (res) {
          wx.getClipboardData({
            success (res) {
              console.log(res.data) // data
            }
          })
        }
      })
    },
    gotoNavigate(e){
      let { list, orgId } = this.properties.manager
      let { index } = e.currentTarget.dataset
      let { navigateUrl, managerId } = list[index]
      wx.navigateTo({
        url: navigateUrl + '?managerId=' + managerId + '&orgId=' + orgId,
      })
    },
    gotoNavigateCard(e){
      let navigateUrl = '/pages/manager/card/card'
      let { list } = this.properties.manager
      let { index } = e.currentTarget.dataset
      let { userId } = list[index]
      wx.navigateTo({
        url: navigateUrl + '?managerId=' + userId,
      })
    },
    // card - 点击小心心
    handleHeartActive(){
      let state = this.properties.state
      state = !state
      this.triggerEvent('childrHeartFocus',state)
    }
  },
})
