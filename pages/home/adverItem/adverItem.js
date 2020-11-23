Page({
  data: {
    viewData:{}
  },
  onLoad: function (options) {
    let adverItem = JSON.parse(options.adverItem)
    console.log(adverItem)
    this.setData({
      viewData: adverItem
    })
  },
})