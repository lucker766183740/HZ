Component({
  properties: {
    fabulous:Object,  //访问量
    count: Number,  //点赞人数
    fabulousAct: Boolean,  //
  },
  data: {

  },
  methods: {
    fabulousActFn(){
      let fabulousAct = this.properties.fabulousAct
      // console.log( fabulousAct )
      fabulousAct = !fabulousAct
      console.log( fabulousAct )
      this.triggerEvent('childrenFabulous',fabulousAct)
    }
  }
})
