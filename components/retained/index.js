Component({
  properties: {
    retainedList:Array
  },
  data: {

  },
  methods: {
    gotoRetainedDetail(e){
      let { index } = e.currentTarget.dataset
      let { retainedList } = this.properties
      let { id } = retainedList[index]
      wx.navigateTo({
        url:'/pages/manager/retainedDetail/retainedDetail?id=' + id
      })
    }
  }
})
