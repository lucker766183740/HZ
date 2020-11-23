// import cityData from '../../utils/cityDataArr'

Component({
  properties: {
    basicView:{
      type:Object,
      value:{},
      observer( newVal, ildVal, changeFn ){
        if( newVal && newVal.type === 'person' ){
          newVal.list.forEach( item => {
            if( item.type === 'disable' ){
              item.sure = false
            }else{
              item.sure = true
            }
          })
          this.setData({
            personList: newVal.list
          })
        }
      }
    }
  },
  data: {
    personMsgList: [], 
    val:'',  // 输入信息
    cityData: [],  //城市数据
    region: [],  //城市-地区
    editTextBoxShow: false,  // 输入弹窗
    editBoxPlaceholder: '',
    editBoxVal: '',
    editBoxIndex: -1, 
    editBoxTop:0,  
  },
  methods: {
    // person - 用户改信息
    showEditBox(e){
      let index = e.currentTarget.dataset.index
      let list = this.data.personList
      let item = list[index] 
      let editBoxTop = ( index*1 + 1 ) * 102 
      if( !item.sure ){ return }
      this.setData({
        editBoxVal: '',
        editBoxIndex: index,
        editBoxTop: editBoxTop,
        editTextBoxShow: true,
        editBoxPlaceholder: '请输入要修改的' + item.title
      })
    },
    // 隐藏 个人信息输入框
    hideEditBox(){
      this.setData({
        editTextBoxShow: false,
        editBoxVal: ''
      })
    },
    inputEditBoxShowText(e){
      let val = e.detail.value
      this.setData({
        editBoxVal: val
      })
    },
    referToPagesPerson(){
      let { editBoxVal, editBoxIndex } = this.data
      let option = {
        val: editBoxVal,
        index: editBoxIndex
      }
      this.triggerEvent('childrenrEditVal', option)
      this.setData({
        editTextBoxShow: false,
        editBoxVal: ''
      })
    },

    // 输入框 - 输入
    inputBasicViewText(e){
      let val = e.detail.value
      this.setData({
        val: val
      })
    },
    // 输入框 - 离开
    blurBasicViewText(){
      let { basicView } = this.properties
      let val = this.data.val
      let valOff = basicView.type === 'input' && basicView.val && !val
      this.setData({
        val: valOff ? basicView.val : val
      })
      this.triggerEvent('childrenText',this.data.val)
    },
    //地区下拉选择
    bindRegionChange: function (e) {
      let value = e.detail.value
      let cityText = value.join('')
      this.setData({
        region: value
      })
      this.triggerEvent('childrenRegion',cityText)
    },
    // 访问详情 
    gotoVisitDetail(e){
      let { index } = e.currentTarget.dataset
      let { basicView } = this.properties
      let { title } = basicView.list[index]
      wx.navigateTo({
        url: '/pages/manager/visitDetail/visitDetail?title=' + title,
      })
    },
  }
})
