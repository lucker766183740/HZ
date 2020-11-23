Page({
  data: {
    list:[
      {
        imgUrl:'../../images/home/manager-header.png',
        name:'客户经理A',
        date:'08-03',
        id:'0001'
      },
      {
        imgUrl:'../../images/home/manager-header.png',
        name:'客户经理B',
        date:'08-04',
        id:'0002'
      }
    ]
  },
  gotoMsgDetail(e){
    let _id = e.currentTarget.dataset.id
    console.log( _id )
    wx.navigateTo({
      url: './messageDetail/messageDetail?_id=' + _id,
    })

  },
  onLoad: function (options) {

  },
  // 获取消息列表
  _getMessageList(){
    
  }
})