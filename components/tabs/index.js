Component({
  properties: {
    tabsData:{
      type:Array,
      value:[],
      observer( newVal, oldVal, changeFn ){
        this._filterBasicViewData(newVal)
      }
    }
  },
  data: {
    currentIndex: 0,
    basicView:[],
    _tabsData:[]
  },
  ready(){     
    let tabsData = this.properties.tabsData
    this._filterBasicViewData(tabsData)
  },
  methods: {
    //swiper切换时会调用
    pagechange: function (e) {
      let index = e.detail.current
      if (e.detail.source === "touch") {
        this.setData({
          currentIndex: index
        })
      }
    },
    //用户点击tab时调用
    titleClick: function (e) {
      let idx = e.currentTarget.dataset.idx
        this.setData({
          currentIndex: idx
        })
    },

    _filterBasicViewData(tabsData){ 
      tabsData.forEach( item => {
        item.basicView = {
          type: 'retained',
          list: item.descList
        }
      })
      this.setData({
        _tabsData: tabsData
      })
    }

  }
})
