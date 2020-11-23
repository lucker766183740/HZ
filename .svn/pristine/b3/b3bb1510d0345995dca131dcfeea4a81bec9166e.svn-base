import visit from './request'

const appId = 'wx8a226baaea01916e'
const APPSECRET = 'd49a82f9555752a41ae8326ac1f135ff'

// let AccessToken = '37_kWKSjcIu5OwomH9JVmWtZZdnITrNcumABdD6s9Ll4vm_BxlntwyQO2NlqrydEY-etQxYdIg5N9sMhBEl-nu85FEFdXop6KUJMvdEUe5esHhocOSPMwXGK6Kcvn8PxHsZUe8fbeTzAk6cux3WOXQeABAWFY'

const getAccessToken = ( that ) => {
  let _this = that
  let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${APPSECRET}`
  visit.request_n_get(url,{},res=>{
    console.log( res )
    if( res.statusCode === 200 && res.data.access_token ){
      let access_token = res.data.access_token
      console.log( res.data )
      setWxacodeunlimit( _this, access_token )
    }
  })
}

const setWxacodeunlimit = ( that, AccessToken ) => {
  let _this = that
  let url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${AccessToken}`
  let formData = {
    page:'pages/manager/card/card',
    scene: '123456',
    "width": 300,
    "auto_color": false
  }
  wx.request({
    url: url,
    data: JSON.stringify(formData),
    method: 'POST',
    header: {// 设置请求的 header
      "Content-Type": "application/json"
    }, 
    success: function (res) {
      console.log(res)
      if( res.statusCode === 200 ){ 
        const base64 = wx.arrayBufferToBase64(res.data)
        console.log(base64)
        let fileManager = wx.getFileSystemManager();//获取文件管理器    
        let filePath = wx.env.USER_DATA_PATH + '/test.jfif';//设置临时路径 
          fileManager.writeFile({//获取到的数据写入临时路径    
            filePath: filePath,//临时路径    
            encoding: 'binary',//编码方式，二进制    
            data: res.data,//请求到的数据    
            success: function(res) {    
              console.log(res)    
              console.log(filePath)//打印路径    
              wx.previewImage({//图片预览
                urls: [filePath]
              })    
              // wx.hideLoading();    
            },    
            fail: function(res) {    
              console.log(res)    
              // wx.hideLoading();    
            },    
          }); 
        // let resData = res.data    
        // console.log( resData)
        // bufferToBase64( _this, resData )
        // let base64Data = wx.arrayBufferToBase64(resData); //arraybuffer转base64
        // console.log( base64Data )
        // const base64ImgUrl = "data:image/png;base64," + base64Data;
        // console.log( base64ImgUrl )
      }
    },
    fail: function (res) {
      console.log( res )
      wx.hideLoading();
    }
  })
}

const bufferToBase64 = ( that, data ) => {
          let fileManager = wx.getFileSystemManager();//获取文件管理器    
          let filePath = wx.env.USER_DATA_PATH + '/test.png';//设置临时路径 
          fileManager.writeFile({//获取到的数据写入临时路径    
            filePath: filePath,//临时路径    
            encoding: 'binary',//编码方式，二进制    
            data: data,//请求到的数据    
            success: function(res) {    
              console.log(res)    
              console.log(filePath)//打印路径    
              wx.previewImage({//图片预览
                urls: [filePath],    
              })    
              wx.hideLoading();    
            },    
            fail: function(res) {    
              console.log(res)    
              wx.hideLoading();    
            },    
          });    
  }


module.exports = {
  getAccessToken,
  setWxacodeunlimit
}