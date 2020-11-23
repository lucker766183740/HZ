import visit from '../../../utils/request'

Component({
  properties: {
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
    _videoList: []
  },
  methods: {

  }
})
