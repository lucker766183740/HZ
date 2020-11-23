import visit from '../../../utils/request'

Page({
  data: {
    messageList:[
      // {
      //   personType: 'to',
      //   headerImg: '../../../images/home/manager-header.png',
      //   message: '尊敬的客户，现在由我来为您服务。',
      //   image:''
      // }, 
      // {
      //   personType: 'from',
      //   headerImg: '../../../images/home/manager-header.png',
      //   message: '客户经理，您好，我想办理这个产品',
      //   image:''
      // }
    ],
    text:'',
    productHidden: true,
    productId: '',
    productImg: '',
    productName: ''
  },
  onLoad: function (options) {
    let detail = JSON.parse( options.detail )
    let userId = wx.getStorageSync('userId')
    this._filterOptionsType(detail)
  },
  // 判断类型
  _filterOptionsType(detail){
    // 产品页跳转过来
    if( detail.wxProductId ){
      let { managerId, orgId, wxProductId, productName, imgSrc } = detail
      let messageList = this.data.messageList
      let message = []
      let managerMessage = {  personType: 'to', headerImg: '../../../images/home/manager-header.png', message: '尊敬的客户，现在由我来为您服务。' }
      messageList.length ? ( message = messageList ) : message.push(managerMessage)
      this.setData({
        productId: wxProductId,
        productName: productName,
        productImg: imgSrc,
        productHidden: false,
        messageList: message,
        managerId: managerId,
        orgId: orgId 
      })
    }else{
      console.log( detail )
    }
  },
  // 输入框
  inputInputTetx(e){
    // console.log( e.detail.value )
    this.setData({
      text: e.detail.value
    })
  },
  // 发送 - 信息
  handSendMessage(){
    let { messageList, text } = this.data
    let { avatarUrl } = wx.getStorageSync('userInfo')
    let msgDetal = {
      personType: 'from',
      headerImg: avatarUrl,
      message: text
    }
    messageList.push( msgDetal )
    this.setData({
      messageList: messageList,
      text:''
    })
  },
  // 发送 - 产品
  handSendProduct(){
    let { productId, productName, productImg, messageList } = this.data
    let { avatarUrl } = wx.getStorageSync('userInfo')
    let msgDetal = {
      personType: 'from',
      headerImg: avatarUrl,
      imageSrc: productImg,
      productName: productName,
      productId: productId
    }
    messageList.push(msgDetal)
    this.setData({
      messageList: messageList,
      productHidden: true
    })
  },
  // 消息产品 - 跳转
  gotoProductDetail(e){
    let { productId } = e.currentTarget.dataset
    let { managerId, orgId } = this.data
    let params = JSON.stringify({
      productId: productId,
      managerId: managerId,
      orgId: orgId
    })
    wx.navigateTo({
      url: '/pages/manager/productDetail/productDetail?params=' + params,
    })
  },

  onReady: function () {

  },
  onShow: function () {

  },

})