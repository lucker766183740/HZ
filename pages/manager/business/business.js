import visit from '../../../utils/request'

Page({
  data: {
    basicViewName:{
      type:'input',
      title:'客户姓名',
      tagging:true,
      placeholder:'请输入您的姓名',
      holderStyle: true
    },
    basicViewPhone:{
      type:'input',
      title:'联系方式',
      tagging:true,
      placeholder:'请输入您的电话',
      holderStyle: true
    },
    basicViewCard:{
      type:'input',
      title:'身份证号',
      placeholder:'请输入身份证号'
    },
    basicViewRegion:{
      type:'city',
      title:'所在地区'
    },
    basicViewAddress:{
      type:'input',
      title:'详细地址',
      placeholder:'请输入您的地址'
    },
    basicViewProduct:{
      type:'text',
      title:'产品名称',
      desc:'微贷款-1'
    },
    basicViewMoney:{
      type:'input',
      title:'申请金额',
      placeholder:'请输入申请金额'
    },
    name:'', //客户姓名
    phone:'',  //联系方式
    card:'',  //身份证号
    region:'',  //所在地区
    address:'',  //详细地址
    product:'',  //产品名称
    money:0,  //申请金额
    productDetail: {},  //产品详情
  },
  onLoad: function (options) {
    let { wxProductId, managerId, orgId } = JSON.parse( options.params )
    console.log( JSON.parse( options.params ) )
    this._getProductDetail( wxProductId )
    this._getUserName()
    this._getUserPhone()
    this.setData({
      wxProductId: wxProductId,
      managerId: managerId,
      orgId: orgId
    })
  },  
  _getProductDetail( id ){
    let url = visit.appUrl + '/app/getProById'
    visit.request_n_post(url,{
      wx_product_id: id
    }, result => {
      if( result.statusCode === 200 && result.data.code === 0 ){
        let resData = result.data.data
        console.log( result )
        let { basicViewProduct } = this.data
        basicViewProduct.desc = resData.productName
        this.setData({
          productDetail: resData,
          basicViewProduct: basicViewProduct
        })      
      }
    })
  },
  // 1.客户姓名
  getChildrenName(e){
    console.log( e )
    this.setData({
      name: e.detail
    })
  },
  // 2.联系方式
  getChildrenPhone(e){
    this.setData({
      phone: e.detail
    })
  },
  // 3.身份证号
  getChildrenCard(e){
    this.setData({
      card: e.detail
    })
  },
  // 4.所在地区
  getChildrenRegion(e){
    this.setData({
      region: e.detail
    })
  },
  // 5.详细地址
  getChildrenAddress(e){
    this.setData({
      address: e.detail
    })
  },
  // 7.申请金额
  getChildrenMoney(e){
    this.setData({
      money: e.detail
    })
  },
  // 9.提交
  bindSubmit(){
    let {name, phone, card, region, address, product, money, productDetail, wxProductId, managerId, orgId } = this.data
    let { userId } = wx.getStorageSync('userInfo')
    let url = visit.appUrl + '/app/saveCustomerAssets'
    
    if( !name ){
      visit.showParamsNot('请输入您的姓名')
      return false
    }

    visit.request_n_post(url,{
      customerId: userId,
      depositAmount: 0,  // 申请金额
      jxWay: "",
      loanAmount: money,
      loanTimeLimit: "",
      loanUse: "",
      managerId: managerId,
      orgId: orgId,
      purchaseAmount: 0,
      wxProductId: wxProductId
    },(result)=>{
      console.log( result )
      if( result.statusCode === 200 && result.data.code === 0 ){
        visit.showParamsNot('提交成功')
        setTimeout( ()=>{
          wx.navigateBack({ delta: 2 })  // 往回跳转2层
        },1000)
      }
    })

    // wx.request({
    //   url: url,
    //   data: formDataJson,
    //   method: 'POST',
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    //     "token": token
    //   }, // 设置请求的 header
    //   success: function (res) {
    //     console.log( res )
    //     if( res.statusCode === 200 && res.data.code === 0 ){
    //       visit.showParamsNot('提交成功')
    //       setTimeout( ()=>{
    //         wx.navigateBack({ delta: 2 })  // 往回跳转2层
    //       },1000)
    //     }
    //   },
    //   fail: function (res) {
    //     console.log( res )
    //     wx.hideLoading();
    //   }
    // })
  },

  // 获取客户姓名
  _getUserName(){
    let realName = wx.getStorageSync('userInfo').realName
    if( realName ){
      let { basicViewName } = this.data
      basicViewName.placeholder = realName
      basicViewName.holderStyle = false
      basicViewName.val = realName
      this.setData({
        basicViewName: basicViewName,
        name: realName
      })
    }
  },
  // 获取客户电话
  _getUserPhone(){
    let mobile = wx.getStorageSync('userInfo').mobile
    if( mobile ){
      let { basicViewPhone } = this.data
      basicViewPhone.placeholder = mobile
      basicViewPhone.holderStyle = false
      basicViewPhone.val = mobile
      this.setData({
        basicViewPhone: basicViewPhone,
        phone: mobile
      })
    }
  },
  
})