import visit from '../../../utils/request'
import util from '../../../utils/util'

Page({
  data: {
    date:'',
    visitList:[
      {
        title:'产品',
        id:1,
        descList:[]
      },
      {
        title:'微名片',
        id:2,
        descList:[]
      }, 
    ]
  },
  onLoad: function (options) {
    this._getDateNowFn()

  },
  // 获取当前时间
  _getDateNowFn(){
    let date = util.formatYearMonth(new Date())
    this.setData({
      date: date
    },()=>{
      this._getVisitList()
    })
  },
  // 时间选择
  triggerDateChange(e){
    let date = util.formatYearMonth( e.detail )
    this.setData({
      date: date
    },()=>{
      this._getVisitList()
    })
  },
  // 获取人员访问
  _getVisitList(){
    let url = visit.appUrl + '/app/viewHistoryListManager'
    let managerId  = wx.getStorageSync('userInfo').userId
    visit.request_n_post(url,{
      managerId: managerId,
      viewDate: this.data.date
    },res => {
      if( res.statusCode === 200 && res.data.code === 0 ){
        let resData = res.data
        let visitList = this.data.visitList
        let descList = []
        visitList[1].descList = [{ title: '访问人数', desc: resData.cardCount }]
        if( resData.product_data.length ){
          resData.product_data.forEach( item => {
            let items = {
              title: item.project_name,
              desc: item.count
            }
            descList.push( items )
          })
        }
        visitList[0].descList = descList
        this.setData({
          visitList: visitList
        })
      }
    })
  }

})