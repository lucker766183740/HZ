import util from '../../../utils/util'
Component({
  properties: {
    date:String
  },
  data: {
    // date: '',
    year: '',
    month: ''    
  },
  ready(){    
    // 初始化获取时间
    let date = this.properties.date
    this._dateFormat(date)
  },
  methods: {
    //获取当前时间 -- 初始化
    getDateTime(e) {
      let date = e.detail.value
      this._dateFormat(date)
      // this._getCountDate(date + '-01')
      // this._getSurveyList()
    },
    // 年月格式化
    _dateFormat(date) {
      let newDateArr = date.split('-')
      this.triggerEvent('childDateChange',date)
      this.setData({
        year: newDateArr[0],
        month: newDateArr[1]
      })
      // this._getCountDate(newDateArr[0] + '-' + newDateArr[1])
    },

    // _getCountDate(date) {
    //   let days = this._getCountDays(date)

    //   let changeDate = this.data.year + '-' + this.data.month
    //   let startTime = changeDate + '-01'
    //   let endTime = changeDate + '-' + days
    //   this.setData({
    //     startTime: startTime,
    //     endTime: endTime
    //   })
    // },
    //一个月有几天
    // _getCountDays(startDate) {
    //   let selectedDate = new Date(startDate);
    //   let selectedMonth = selectedDate.getMonth() + 1;
    //   selectedDate.setMonth(selectedMonth);
    //   selectedDate.setDate(0);
    //   let dayMany = selectedDate.getDate();
    //   return dayMany
    // }

  }
})
