import visit from '../../../utils/request'

Page({
  data: {    
    manager:{
      headline:'明星客户经理',
      headlineShow:false,
      type:'star',
      orgId: 0,
      list:[]
    },

  },
  onLoad: function (options) {
    this._getFocusManagerList()
  },
  // 获取关注的客户经理
  _getFocusManagerList(){
    let url = visit.appUrl + '/app/focusList'
    visit.request_n_post(url,{
      customerId: wx.getStorageSync('userInfo').userId,
      projectType: 1   // 1-客户经理
    }, res => {
      if( res.statusCode === 200 && res.data.code === 0 ){
        let resData = res.data.data
        if( resData.length ){
          resData.forEach( item => {
            this._getManagerDetail( item.projectId )
          })
        }
      }
    })
  },
  // _获取客户经理详情
  _getManagerDetail( managerId ){
    let url = visit.appUrl + '/app/card/' + managerId
    visit.request_n_get(url, {
    }, (result) => {
      if( result.statusCode === 200 && result.data ){
        let resData = result.data
        let managerData = this.data.manager
        let manager = {
          type: 'card',
          name: resData.realName,
          job:'客户经理',
          managerId: resData.managerId,
          formId: resData.businessCardId,
          phone: resData.mobile,
          wechat: resData.wechat || resData.mobile,
          company: resData.address || '青岛市即墨区新兴路79号',
          headerImg: visit.appUrl + '/smallapple/'+ resData.photoStr,
          navigateUrl:'/pages/manager/card/card'
        }
        managerData.list.push( manager )
        this.setData({
          manager: managerData
        })
      }
    })
  }
})