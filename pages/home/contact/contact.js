const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
/**
 * 初始化数据
 */
function initData(that) {
 inputVal = '';

 msgList = [{
   speaker: 'server',
   contentType: 'text',
   content: '欢迎来到英雄联盟，敌军还有30秒到达战场，请做好准备！'
  },
  {
   speaker: 'customer',
   contentType: 'text',
   content: '我怕是走错片场了...'
  }
 ]
 that.setData({
  msgList,
  inputVal
 })
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
  url:'../../../images/home/contact-voice.png'
 },

 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function(options) {
  initData(this);
  this.setData({
   cusHeadIcon: app.globalData.userInfo.avatarUrl,
  });


  //文本信息的输入监听
chatInput.setTextMessageListener(function (e) {
  let content = e.detail.value;//输入的文本信息
});


//获取录音之后的音频临时文件
chatInput.recordVoiceListener(function (res, duration) {
  let tempFilePath = res.tempFilePath;//语音临时文件的路径
  let vDuration = duration;//录音时长
});
//监听录音状态
chatInput.setVoiceRecordStatusListener(function (status) {
     switch (status) {
         case chatInput.VRStatus.START://开始录音

             break;
         case chatInput.VRStatus.SUCCESS://录音成功

             break;
         case chatInput.VRStatus.CANCEL://取消录音

             break;
         case chatInput.VRStatus.SHORT://录音时长太短

             break;
         case chatInput.VRStatus.UNAUTH://未授权录音功能

             break;
         case chatInput.VRStatus.FAIL://录音失败(已经授权了)

             break;
     }
 })

 //收起自定义功能窗口
chatInput.closeExtraView();

//自定义功能点击事件
chatInput.clickExtraListener(function (e) {
            let itemIndex = parseInt(e.currentTarget.dataset.index);//点击的自定义功能索引
            if (itemIndex === 2) {
                that.myFun();//其他的自定义功能
                return;
            }
            //选择图片或拍照
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['compressed'],
                sourceType: itemIndex === 0 ? ['album'] : ['camera'],
                success: function (res) {
                    let tempFilePath = res.tempFilePaths[0];
                }
            });
        });
//新增右下角加号button点击事件
chatInput.setExtraButtonClickListener(function (dismiss) {
            console.log('Extra弹窗是否消失', dismiss);
        })
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
 focus: function focus(e){
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

 //失去聚焦(软键盘消失)
 blur: function blur(e){
  this.setData({
   scrollHeight: '100vh',
   inputBottom: 0
  })
  this.setData({
   toView: 'msg-' + (msgList.length - 1)
  })

 },
//  点击语音图片时触发的事件
 bindvoice(e){
   if(this.data.url == "../../../images/home/contact-voice.png"){
   this.setData({
     url:'../../../images/home/contact-keys.png',
     
   })
  this.focus()
   }else{
     this.setData({
       url:'../../../images/home/contact-voice.png'
     })
     this.focus()
   }
 },

 /**
  * 发送点击监听
  */
 sendClick: function(e) {
  msgList.push({
   speaker: 'customer',
   contentType: 'text',
   content: e.detail.value
  })
  inputVal = '';
  this.setData({
   msgList,
   inputVal
  });


 },

 /**
  * 退回上一页
  */
 toBackClick: function() {
  wx.navigateBack({})
 }

})