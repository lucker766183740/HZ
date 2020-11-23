Page({
  data: {
    basicView:{
      type:'retained',
      list:[
        { title:'购买人', desc:'张三' },
        { title:'客户电话', desc:'18645612365' },
        { title:'身份证号', desc:'11010119900307133X' },
        { title:'购买时间', desc:'2020-08-03' },
        { title:'购买金额', desc:'500元' },
        { title:'购买产品', desc:'经营贷' },
        { title:'产品编号', desc:'JYD-WD-001' },
        { title:'产品详情', desc:'微贷产品，贷款期限3-36个月，为个体工商户提供资金周转' },
        { title:'到期时间', desc:'2022-08-03' },
        { title:'客户经理', desc:'李四' },
        { title:'员工编号', desc:'12963652' },
        { title:'所属支行', desc:'西北支行' }
      ]
    }
  },
  onLoad: function (options) {
    console.log( options.id )
  },
})