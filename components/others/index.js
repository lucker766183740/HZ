import visit from '../../utils/request'

Component({
  properties: {
    imageTextList:{
      type: Array,
      value: [],
      observer( newVal, oldVal, changeFn ){
        console.log( newVal )
        newVal.forEach( item => {
          item.imgPath = visit.appUrl + item.path
        })
        this.setData({
          _imageTextList: newVal
        })
      }
    },
    videoList:{
      type: Array,
      value: [],
      observer( newVal, oldVal, changeFn ){
        newVal.forEach( item => {
          item.mediaPath = visit.appUrl + item.path
        })
        this.setData({
          _videoList: newVal
        })
      }
    }
  },
  data: {
    _imageTextList: [],
    _videoList: []
  },
  methods: {

  }
})
