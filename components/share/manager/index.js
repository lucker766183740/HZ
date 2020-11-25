Component({
  properties: {
    manager: {
      type:Object,
      value:{},
      observer( newVal, oldVal, changeFn ){
        let that = this
        console.log( newVal )
        wx.getImageInfo({
          src: newVal.photoStr,
          success: function (res) {
            that.setData({
              _managerHeaderCanvasImg: res.path,
              _manager: newVal
            })
          }
        })
      }
    },
    managerShareImg:{
      type:String,
      value:'',
      observer( newVal, oldVal, changeFn ){        
        let that = this
        wx.getImageInfo({
          src: newVal,
          success: function (res) {
            that.setData({
              _managerShareCanvasImg: res.path,
              _managerShareImg: newVal
            },()=>{
              that._drawImg()
            })
          }
        })
      }
    },
  },
  data: {
    _manager:{},
    _managerShareImg:'',
    canvasHidden: true,
    _managerHeaderCanvasImg: '',
    _managerShareCanvasImg:''
  },
  ready() {
    // context.draw(false, this.getTempFilePath)
    // this._drawImg()
  },
  methods: {
    handerSaveShareToPhone(){
      this.setData({
        canvasHidden: false
      })
    },
    testCanvasHidden(){
      this.setData({
        canvasHidden: true
      })
    },
    // 绘制海报
    _drawImg(){
      let that = this
      let { name, managerId, phone, wechat, orgName } = this.properties.manager
      let ctx = wx.createCanvasContext('share',this)
      this._drawRoundedRect(ctx,"#fff","#fff",0,0,320,500,8)
      console.log( this.data._managerHeaderCanvasImg )
      ctx.drawImage( this.data._managerHeaderCanvasImg, 20, 20, 280, 240)
      // 1.客户经理 - 阴影
      ctx.font = 'normal bold 24px sans-serif'
      ctx.setFillStyle('#ccc')
      ctx.fillText( name, 26, 306)
      ctx.beginPath()
      // 1.客户经理
      ctx.setFillStyle('#333')
      ctx.fillText( name, 24, 305)
      ctx.beginPath()
      // 2.客户经理 - 职务
      ctx.setFontSize(13)
      ctx.setFillStyle('orange')
      ctx.fillText("客户经理", 24, 330)
      ctx.beginPath()
      // 3.
      ctx.setFillStyle('#333')   
      ctx.font = 'normal 400 16px sans-serif'
      ctx.fillText( managerId, 24, 350)
      ctx.fillText( phone, 24, 372)
      ctx.fillText( wechat, 24, 394)
      ctx.fillText( orgName, 24, 416)
      ctx.beginPath()
      
      ctx.drawImage( this.data._managerShareCanvasImg, 190, 280, 120, 120)
      ctx.draw()   //将之
      //将生成好的图片保存到本地
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'share',
          success: function (res) {
            var tempFilePath = res.tempFilePath;
            that.setData({
              canvasPath: tempFilePath,
              // canvasHidden: true
            });
          },
          fail: function (res) {
            console.log(res);
          }
        },that);
      }, 1000);
    },
    //点击保存到相册
    handerSaveShareToPhone() {
      var that = this
      wx.saveImageToPhotosAlbum({
        filePath: that.data.canvasPath,
        success(res) {
          wx.showModal({
            content: '海报已保存到相册',
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#333',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
                that.triggerEvent('childrenShareBoxHidden',true)
              }
            }, fail: function (res) {
              console.log(11111)
            }
          })
        }
      })
    },
    // 关闭canvas图层
    handleCloseTips(){
      this.triggerEvent('childrenShareBoxHidden',true)
    },
    // 防止触发遮罩层事件 - 什么也不做
    handleNothing(){

    },
    _roundedRect(ctx,x,y,width,height,radius){
      if(width <= 0 || height <= 0){
          ctx.arc(x,y,radius,0,Math.PI*2);
          return;
      }

      ctx.moveTo(x+radius,y);
      ctx.arcTo(x+width,y,x+width,y+height,radius);
      ctx.arcTo(x+width,y+height,x,y+height,radius);
      ctx.arcTo(x,y+height,x,y,radius);
      ctx.arcTo(x,y,x+radius,y,radius);
    },     
  
    _drawRoundedRect(ctx,strokeStyle,fillStyle,x,y,width,height,radius){
        ctx.beginPath();
        this._roundedRect(ctx,x,y,width,height,radius);
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.stroke();
        ctx.fill();
    }
  }
})
