import visit from '../../../utils/request'

Component({
  properties: {
    imageTextSection:{
      type: Object,
      value: {},
      observer( newVal, oldVal, changeFn ){
        console.log( newVal )
        newVal.imageTextList.forEach( item => {
          item.imgPath = visit.appUrl + item.path
          console.log( item.imgPath )
        })
        console.log(newVal.imageTextList)
        this.setData({
          _imageTextList: newVal.imageTextList
        })
      }
    }
  },
  data: {
    _imageTextList: []
  },
  methods: {
    handleItem(e){
      let { index } = e.currentTarget.dataset
      let { _imageTextList } = this.data
      let id=_imageTextList[index].showId
      wx.navigateTo({
     //   url: url + link,
        url:'/pages/content/content?id='+id+'&type=2'
    })
    }
  }
})
