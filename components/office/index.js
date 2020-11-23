Component({
  properties: {
    backOffice: Object,
    state: Boolean
  },
  data: {
    managerList:[]
  },
  attached(){
    // this._filterScore()
  },
  methods: {
    gotoNavigateCard(e){
      let navigateUrl = '/pages/manager/card/card'
      let { list } = this.properties.backOffice
      let { index } = e.currentTarget.dataset
      let { userId } = list[index]
      wx.navigateTo({
        url: navigateUrl + '?managerId=' + userId,
      })
    }
  },
})
