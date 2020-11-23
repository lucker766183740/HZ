import util from './util.js'
import visit from './request'
  const getLocaltion = ( cb ) => {
    wx.getLocation({
      type: 'wgs84',// 参考系
      success: function (res) {
        let { latitude, longitude } = res

        let localtion = {
          latitude: latitude,
          longitude: longitude
        }
        cb( localtion )
      }
    })
  }

  const getLocaltionMarks = ( list, latitude, longitude ) => {
    let item = {
      id: list.length,
      latitude: latitude,
      longitude: longitude,
      iconPath:'/images/icon/position.png',
      width: 40,
      height: 40
    }
    list.push( item )
    return list 
  }
  
  const getLocaltionPoints = ( list, latitude, longitude ) => {
    let item = {
      id: list.length,
      latitude: latitude,
      longitude: longitude
    }
    list.push( item )
    return list 
  }

/********** 持续定位 **********/
// 定位- 1.判断用户身份
  // 在 home-首页 进行了身份验证
// 定位- 2.客户经理开启后台定位
const managerBackgroundLocation = ( openTime, endTime, delay ) => {
  wx.startLocationUpdateBackground({
    success(res) {
      console.log('开启后台定位', res)   
      isOpenTime( openTime, endTime, delay )
    },
    fail(res) {
     console.log('开启后台定位失败', res)
    }
   })
}
// 定位- 3.判断是否到开启时间
const isOpenTime = ( openTime, endTime, delay ) => {
  let oldDate = util.formatHourMinSec( new Date() )
  // let openTime = this.data.openTime
  // 判断是否到定义的开启时间
  let openTimeDevice = setInterval( () => {
    oldDate = util.formatHourMinSec( new Date() )
    if( ( util.formatStamp( oldDate ) >= util.formatStamp( openTime )) && ( util.formatStamp( oldDate ) <= util.formatStamp( endTime ))){
      clearInterval( openTimeDevice )
      console.log( 'start' )
      managerLocation( endTime, delay )
      // this._testLocaltion( oldDate )
    }
  },1000)
}
// 定位 - 4.持续定位
const managerLocation = ( endTime, delay ) => {
  let oldDate = util.formatHourMinSec( new Date() )     
  let userId = wx.getStorageSync('userInfo').userId
  // let delay = this.data.delay
  let localtionArr = []
  wx.onLocationChange(function(res) {
    let nowDate = util.formatHourMinSec( new Date() )               
    let stamp = util.formatStamp( nowDate ) - util.formatStamp( oldDate )   
    console.log( stamp )
    if( stamp >= (delay * 60) ){
      oldDate = nowDate
      let item = {
        latitudeNum: res.latitude.toFixed(6),
        longitudeNum: res.longitude.toFixed(6),
        trackEventsId: 0,
        trackTime: oldDate,
        userId: userId
      }
      localtionArr.push(item)
      wx.setStorageSync('localtionArr', localtionArr)
      // console.log( localtionArr )
      isEndTime( endTime, oldDate, localtionArr )
    }
  })
}
// 定位 - 5.判断是否到结束时间
const isEndTime = ( endTime, oldDate, localtionArr ) => {
  // let endTime = this.data.endTime              
  let stamp = util.formatStamp( oldDate ) - util.formatStamp( endTime )
  if( stamp > 0 ){
    console.log('endTime')
    console.log( localtionArr )
    let localtionStorage = JSON.stringify(wx.getStorageSync('localtionArr'))
    console.log( localtionStorage )
    wx.stopLocationUpdate()
    
    let url = visit.appUrl + '/app/saveTrackEvents'
    let token = wx.getStorageSync('token')
    wx.request({
      url: url,
      data: localtionStorage,
      method: 'POST',
      header: {
        "Content-Type": "application/json",
        "token": token
      }, // 设置请求的 header
      success: function (res) {
        console.log( res )
      },
      fail: function (res) {
        console.log( res )
        wx.hideLoading();
      }
    })
  }
}

  module.exports = {
    getLocaltion,
    getLocaltionMarks,
    getLocaltionPoints,
    managerBackgroundLocation
  }