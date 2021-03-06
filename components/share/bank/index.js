Component({
  properties: {
    shareData:{
      type:Object,
      value:{},
      observer( newVal, oldVal, changeFn ){
        // console.log( newVal )
        // if( JSON.stringify(newVal) != '{}'){
        //   this._drawImg()
        // }
        
      }
    },
    shareImg:{
      type:String,
      value:'',
      observer( newVal, oldVal, changeFn ){        
        let that = this
        console.log(newVal)
        wx.getImageInfo({
          src: newVal,
          success: function (res) {
            that.setData({
              _shareCanvasImg: res.path
            },()=>{
              that._drawImg()
            })
          }
        })
      }
    },
  },
  data: {
    canvasHidden: true,
    _shareCanvasImg:'',
    imgList:[
      '/images/home/opt-view-01.png',
      '/images/home/opt-view-02.png',
      '/images/home/opt-view-03.png'
    ],
    bankImg:''
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
      let { adverImg, category, InforMation, ware } = this.properties.shareData
      // console.log( adverImg )
      let ctx = wx.createCanvasContext('share',this)
      // 广告位
      // wx.getImageInfo({
      //   src: adverImg,
      //   success: function (res) {
      //     // ctx.drawImage( res.path, 20, 20, 280, 200)
      //   }
      // })

      // 2.产品类目 - 标题   
      // ctx.beginPath()
      // ctx.font = 'normal bold 18px sans-serif'
      // ctx.setFillStyle('#323232')
      // ctx.fillText( '产品类目', 0, 20)
      // 2.产品类目 - 内容
      // category.forEach( (item,index ) => {
      //   ctx.beginPath()
      //   this._drawRoundedRect(ctx,"#fff","#fff",( 0+110*index ),35,100,90,8)
      //   ctx.drawImage( this.data.imgList[index], ( 35+110*index ), 50, 32, 32)      
      //   ctx.font = 'normal normal 16px sans-serif'
      //   ctx.setFillStyle('#323232')
      //   ctx.textAlign = 'center'
      //   ctx.fillText( item, ( 50+110*index ), 107)
      // })

      // // 3.新闻      
      // ctx.beginPath()
      // this._drawRoundedRect(ctx,"#fff","#fff",0,135,320,80,8)
      // InforMation.forEach( (item,index) => {
      //   this._drawRoundedRect(ctx,"#FFF3E7","#FFF3E7",10,155+30*index,40,20,4)
      //   ctx.font = 'normal normal 12px sans-serif'
      //   ctx.setFillStyle('orange')
      //   ctx.textAlign = 'left'
      //   ctx.fillText( '新闻', 18, 170+30*index )         
      //   ctx.beginPath()
      //   ctx.font = 'normal normal 14px sans-serif'
      //   ctx.setFillStyle('#323232')
      //   ctx.fillText( item, 60, 170+30*index )
      //   this._drawRoundedRect(ctx,"#fff","#fff",297,155+30*index,40,20,4)
      // })
      this._drawRoundedRect(ctx,"#fff","#fff",0,0,320,500,8)
      // 4.产品推荐 - 标题   
      ctx.beginPath()
      ctx.font = 'normal bold 18px sans-serif'
      ctx.setFillStyle('#323232')
      ctx.fillText( '产品推荐', 20, 20)
      // -------------------------------------------------------------------------
      // 产品-图片
      ctx.beginPath()
      console.log(ware)
      //this._drawRoundedRect(ctx,"#fff","#fff",0,360,320,120,8)
      wx.getImageInfo({
        src: ware.coverPath,
        success (res) {
          ctx.drawImage(res.path, 40, 60, 240, 120)
          ctx.draw(true)
        }
      })
      // 产品-name
      ctx.beginPath()
      ctx.font = 'normal bold 16px sans-serif'
      ctx.setFillStyle('#323232')
      ctx.fillText( ware.productName, 40, 202)
      // 右侧点击量
      ctx.drawImage( '../../../images/icon/lock-cm.png', 220, 189, 20, 20)
      ctx.beginPath()
      ctx.font = 'normal normal 12px sans-serif'
      ctx.setFillStyle('#F6A83A')
      ctx.fillText( ware.clickCount || '0', 243, 203)


      this._drawRoundedRect(ctx,"#FFF3E7","#FFF3E7",10,360,120,24,4)
      ctx.beginPath()
      // 描述内容
      if(ware.productTypeId === 1){
      
        ctx.font = 'normal normal 12px sans-serif'
        ctx.setFillStyle('#F6A83A')
        ctx.fillText( '联系人:'+ware.riskLev+',联系电话:'+ware.investmentHorizon, 243, 306)
      }else if(ware.productTypeId === 2){
 
        ctx.font = 'normal normal 12px sans-serif'
        ctx.setFillStyle('#F6A83A')
        ctx.fillText( '起存金额:'+ware.minimumAmount+',存期:'+ware.depositTerm, 243, 306)
      }else {
      
        ctx.font = 'normal normal 12px sans-serif'
        ctx.setFillStyle('#666666')
        ctx.fillText( '贷款额度:'+ware.loanAmount, 40, 230)
        ctx.fillText( '贷款期限:'+ware.loanTimeLimit, 40, 250)
      }
      // 产品关键字
      // this._drawRoundedRect(ctx,"#fff","#fff",220,260,120,24,4)
      // this._drawRoundedRect(ctx,"#F6A83A","#fff",235,262,65,20,4)
      ctx.beginPath()
      ctx.font = 'normal normal 12px sans-serif'
      ctx.setFillStyle('#666666')
      ctx.fillText( ware.productKeyword, 40, 295)

      // 银行名称
      ctx.beginPath()
      ctx.font = 'normal bold 16px sans-serif'
      ctx.setFillStyle('#666666')
      ctx.fillText( ware.orgName, 130, 320)
      //------------------------------------------------------------------------
      // 二维码
      this._drawRoundedRect(ctx,"#fff","#fff",0,360,320,120,8)
      ctx.drawImage( this.data._shareCanvasImg, 100, 340, 120, 120)
      ctx.draw() 

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
