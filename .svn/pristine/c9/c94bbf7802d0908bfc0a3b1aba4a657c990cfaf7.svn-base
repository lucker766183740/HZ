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
    ]
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
      wx.getImageInfo({
        src: adverImg,
        success: function (res) {
          // ctx.drawImage( res.path, 20, 20, 280, 200)
        }
      })

      // 2.产品类目 - 标题   
      ctx.beginPath()
      ctx.font = 'normal bold 18px sans-serif'
      ctx.setFillStyle('#323232')
      ctx.fillText( '产品类目', 0, 20)
      // 2.产品类目 - 内容
      category.forEach( (item,index ) => {
        ctx.beginPath()
        this._drawRoundedRect(ctx,"#fff","#fff",( 0+110*index ),35,100,90,8)
        ctx.drawImage( this.data.imgList[index], ( 35+110*index ), 50, 32, 32)      
        ctx.font = 'normal normal 16px sans-serif'
        ctx.setFillStyle('#323232')
        ctx.textAlign = 'center'
        ctx.fillText( item, ( 50+110*index ), 107)
      })

      // 3.新闻      
      ctx.beginPath()
      this._drawRoundedRect(ctx,"#fff","#fff",0,135,320,80,8)
      InforMation.forEach( (item,index) => {
        this._drawRoundedRect(ctx,"#FFF3E7","#FFF3E7",10,155+30*index,40,20,4)
        ctx.font = 'normal normal 12px sans-serif'
        ctx.setFillStyle('orange')
        ctx.textAlign = 'left'
        ctx.fillText( '新闻', 18, 170+30*index )         
        ctx.beginPath()
        ctx.font = 'normal normal 14px sans-serif'
        ctx.setFillStyle('#323232')
        ctx.fillText( item, 60, 170+30*index )
        this._drawRoundedRect(ctx,"#fff","#fff",297,155+30*index,40,20,4)
      })

      // 4.产品推荐 - 标题   
      ctx.beginPath()
      ctx.font = 'normal bold 18px sans-serif'
      ctx.setFillStyle('#323232')
      ctx.fillText( '产品推荐', 0, 242)
      this._drawRoundedRect(ctx,"#fff","#fff",0,250,320,120,8)
      // 产品-name
      ctx.beginPath()
      ctx.font = 'normal bold 16px sans-serif'
      ctx.setFillStyle('#323232')
      ctx.fillText( ware.name, 20, 276)
      // keyword
      this._drawRoundedRect(ctx,"#fff","#fff",220,260,120,24,4)
      this._drawRoundedRect(ctx,"#F6A83A","#fff",235,262,65,20,4)
      ctx.beginPath()
      ctx.font = 'normal normal 12px sans-serif'
      ctx.setFillStyle('#F6A83A')
      ctx.fillText( ware.keyWord, 243, 276)
      // 横线
      ctx.moveTo(20,290)
      ctx.lineTo(300,290)
      ctx.lineWidth = 1
      ctx.strokeStyle = "#e1e1e1"
      ctx.stroke()
      // 左下-收益率%
      ctx.beginPath()
      ctx.font = 'normal normal 24px sans-serif'
      ctx.setFillStyle('#DF0813')
      ctx.fillText( `+${ware.rate}%`, 48, 324)
      // 左下-收益率文字
      ctx.beginPath()
      ctx.font = 'normal normal 14px sans-serif'
      ctx.setFillStyle('#aaa')
      ctx.fillText( '参考年化收益率', 40, 350)
      // 竖线
      ctx.moveTo(165,320)
      ctx.lineTo(165,340)
      ctx.lineWidth = 1
      ctx.strokeStyle = "#e1e1e1"
      ctx.stroke()
      
      // 右下-收益率%
      ctx.beginPath()
      ctx.font = 'normal normal 24px sans-serif'
      ctx.setFillStyle('#DF0813')
      ctx.fillText( `${ware.startAmount/10000}万元`, 190, 324)
      // 右下-收益率文字
      ctx.beginPath()
      ctx.font = 'normal normal 14px sans-serif'
      ctx.setFillStyle('#aaa')
      ctx.fillText( ware.time, 204, 350)

      // 二维码
      this._drawRoundedRect(ctx,"#fff","#fff",0,360,320,120,8)
      ctx.drawImage( this.data._shareCanvasImg, 110, 360, 120, 120)

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
      }, 200);
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
