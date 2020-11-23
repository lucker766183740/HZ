Page({
  data: {
    polyline: [{
      points: [],
      color: "#e42a2a",
      width: 3,
      dottedLine: true
    }],
    latitude: '',  //纬度
    longitude: '',  //经度
    markers: [],  //标记
  },
  onLoad: function (options) {
    this._getLocaltionArr()
  },

  _getLocaltionArr(){
    let localtionArr = wx.getStorageSync('localtionArr')
    console.log( localtionArr )
    if( localtionArr ){
      this._filterMarker( localtionArr )
      this._filterPoints( localtionArr )
    }else{
      this.getAddressDetail()
    }
  },
  _filterMarker( list ){
    let markerList = []
    list.forEach( ( item, index ) => {
      let marker = {
        id : index,
        latitude : item.latitudeNum,
        longitude : item.longitudeNum,
        iconPath : '/images/icon/position.png',
        width : 40,
        height : 40
      }
      markerList.push( marker )
    })
    this.setData({
      markers: markerList
    })
  },
  _filterPoints( list ){
    let pointList = []
    let points = []
    list.forEach( ( item, index ) => {
      let point = {
        id : index,
        latitude : item.latitudeNum,
        longitude : item.longitudeNum
      }      
      points.push( point )
    })
    pointList.push({ points:points })
    this.setData({
      polyline: pointList
    })
  },
  getAddressDetail() {
    let that = this;
    wx.getLocation({
      type: 'wgs84',// 参考系
      success: function (res) {
        let { markers, polyline } = that.data
        let { latitude, longitude } = res
        let marksItem = {
          id: markers.length,
          latitude: latitude,
          longitude: longitude,
          iconPath:'/images/icon/position.png',
          width: 40,
          height: 40
        }
        markers.push( marksItem )
        polyline[0].points.push( marksItem )
        that.setData({
          latitude: latitude,
          longitude: longitude,
          markers: markers,
          polyline: polyline
        })
        console.log( that.data.markers)

        // 构建请求地址
        //var qqMapApi = 'http://apis.map.qq.com/ws/geocoder/v1/' + "?location=" + latitude + ',' +
          //longitude + "&key=" + 'XVLBZ-BSU66-ULJSQ-MFGXD-TM7GZ-55F2M' + "&get_poi=1";

        //that.sendRequest(qqMapApi);
      }
    })
  },
  // 发送请求获取地图接口的返回值
  sendRequest: function (qqMapApi) {
    let that = this;
    // 调用请求
    wx.request({
      url: qqMapApi,
      data: {},
      method: 'GET',
      success: (res) => {
        console.log(res)
        if (res.statusCode == 200 && res.data.status == 0) {
          // 从返回值中提取需要的业务地理信息数据
          that.setData({ nation: res.data.result.address_component.nation });
          that.setData({ province: res.data.result.address_component.province });
          that.setData({ city: res.data.result.address_component.city });
          that.setData({ district: res.data.result.address_component.district });
          that.setData({ street: res.data.result.address_component.street });
        }
      }
    })
  },
  onShareAppMessage(res){
    let that = this
    console.log( res )
    // 返回数据
    return {
      title: that.data.info.name,
      path: '/pages/food/info?id=' + that.data.info.id,
      success: function(res) {
        // 转发成功，可以把当前页面的链接发送给后端，用于记录当前页面被转发了多少次或其他业务
        wx.request({
          url: app.buildUrl("/member/share"),
          data: {
            url: utils.getCurrentPageUrlWithArgs()
          },
          success: function(res) {
            //console.log('成功');
          }
        });
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})