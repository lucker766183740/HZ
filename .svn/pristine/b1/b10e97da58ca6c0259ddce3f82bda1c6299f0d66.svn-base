Component({
  properties: {
    list:{
      type:Array,
      value:[],
      observer( newVal, oldVal, changeFn ){
        let list = newVal.length > 2 ? newVal.splice(0,2) : newVal
        this.setData({
          _list:list
        })
      }
    }
  },
  data: {
    _list:[]
  },
  methods: {
    gotoNewsDetail(e){
      let url = '/pages/information/informationDetail/informationDetail?link='
      let { index } = e.currentTarget.dataset
      let { _list } = this.data
      let link = _list[index].financialLink
      let id=_list[index].financialId
      wx.navigateTo({
     //   url: url + link,
        url:'/pages/content/content?id='+id+'&type=1'
    })
    }
  }
})
