const app = getApp();
var inputVal = '';
var msgList = [];
var recMsgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var that_this= null;
   //获取当前用户Id
var {userId} =wx.getStorageSync('userInfo')
   console.log(userId)
   let socketOpen = true
/**
 * 初始化数据
 */
function initData(that) {
 inputVal = '';
 that_this = that
 msgList = [{
  messageContent:'你好呀',
  messageType:"2", //1登录  2文本  3语音  4图片  9已读
  receiveUserId:1,
  sendTime:"2020-11-25 11:10:55",
  sendUserId:48
}
 ]
 that.setData({
  msgList,
  inputVal
 })
}
wx.connectSocket({
  url: 'ws://192.168.1.81:8282/renren-fast/websocket/'+userId
},(success)=>{
  console.log('111')
  socketOpen = true
},(fail)=>{
  console.log('222')
  socketOpen = false
})

// 关闭时
wx.onSocketClose((result) => {
  console.log('对方已经退出聊天室')

})
// 连接超时
wx.onSocketError((result) => {
  console.log('连接失败')
  // 重连
})
//接受
wx.onSocketMessage(function (res){
  console.log(res)
  recMsgList.push(JSON.parse(res.data))
  that_this.setData({
    msgList:recMsgList
   })
})

function sendSocketMessage(msg,that) {
  console.log(msg)
  if (socketOpen) {
    console.log('msg')
    wx.sendSocketMessage({
      data:msg,
      success:function (){
        console.log(true)
        msgList.push(JSON.parse(msg))
        that.setData({
          msgList:msgList
         })
      },
      fail:function(){
        console.log(false)
        msgList.push(JSON.parse(msg))
      }
    })
    console.log(msgList)
  } else {
    // 重连
  }
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//  var query = wx.createSelectorQuery();
//  query.select('.scrollMsg').boundingClientRect(function(rect) {
//  }).exec();
// }

Page({

 /**
  * 页面的初始数据
  */
 data: {
  scrollHeight: '100vh',
  inputBottom: 0,
  input:true,
  msgList:[],
  recMsgList:[]
 },

 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function(options) {
  initData(this);
 
 },

 /**
  * 生命周期函数--监听页面显示
  */
 onShow: function() {

 },

 /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
 onPullDownRefresh: function() {

 },

 /**
  * 页面上拉触底事件的处理函数
  */
 onReachBottom: function() {

 },

 /**
  * 获取聚焦
  */

 focus: function(e) {
  keyHeight = e.detail.height;
  this.setData({
   scrollHeight: (windowHeight - keyHeight) + 'px'
  });

  this.setData({
   toView: 'msg-' + (msgList.length - 1),
   inputBottom: keyHeight + 'px'
  })
  //计算msg高度
  // calScrollHeight(this, keyHeight);
 },
// 实时获取用户输入信息
 bindinput(e){
  if(e.detail.value != ""){
    this.setData({
      input:false,
      inputVal:e.detail.value
    })
  }else{
   this.setData({
      input:true
    })

  }
 
 },
 //失去聚焦(软键盘消失)
 blur: function(e) {
  this.setData({
   scrollHeight: '100vh',
   inputBottom: 0,

  })
  this.inputVal = ''
  this.setData({
   toView: 'msg-' + (msgList.length - 1),
   input:true
  })

 },

 /**
  * 发送点击监听
  */
 sendClick: function(e) {
   let msg = {
    messageContent: this.data.inputVal, //!= '' ? this.data.inputVal :  e.detail.value,
    messageType:2,
    receiveUserId:1,
    sendTime:new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
    sendUserId:userId,
  }
  this.setData({
    // msgList:[msg],
    inputVal
   })
  let msgStr = JSON.stringify(msg)
  sendSocketMessage(msgStr,this)
  inputVal = '';
    this.setData({
      inputVal
    });
   },
 
    /**
      * 退回上一页
      */
    toBackClick: function() {
      wx.navigateBack({})
    }

 },

)