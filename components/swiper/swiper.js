Component({
  properties: {
    imgUrls: Array,
    advertisingList: Array
  },
  data: {
  //   imgUrls: [
  //   '../../images/home/banner-01.png',
  //   '../../images/home/banner-02.png',
  //   '../../images/home/banner-03.png'
  // ],
    swiperCurrent: 0,
    msglist: [],//消息列表
    currentIndex: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    flag: true,
  },
  methods: {
    swiperChange: function (e) {
      // console.log(e)
      if (e.detail.source == "touch") {
        this.setData({
          swiperCurrent: e.detail.current
        })
      }
    },
    //index值
    handleChange(e) {
      this.setData({
        currentIndex: e.detail.current
      })
    },
    gotoSwiperItem(e){
      // console.log(e.currentTarget.dataset.index)
      let index = e.currentTarget.dataset.index
      console.log('222222222222222222222222222222')
      console.log(this.properties)
      let advertisingList = this.properties.advertisingList
      console.log(advertisingList)
      let adverItem = JSON.stringify(advertisingList[index])
      let id = advertisingList[index].advertisingId
      wx.navigateTo({
        //url: '/pages/home/adverItem/adverItem?adverItem=' + adverItem,
        url: '/pages/content/content?id=' + id+'&type=3',
      })
    }
  }
})
