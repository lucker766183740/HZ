// 时间-年月日时分秒
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 时间-年月日
const formatYearMonthDay = date =>{
  if(date.toString().indexOf('-') !== -1){
    date = date.replace(/-/g, '/')
  }
  let startDate = new Date(date)
  let startDateYear = startDate.getFullYear() + '-' + formatNumber(startDate.getMonth() + 1) + '-' + formatNumber(startDate.getDate())
  return startDateYear
}
// 时间-年月
const formatYearMonth = date =>{
  if(date.toString().indexOf('-') !== -1){
    date = date.replace(/-/g, '/')
  }
  let startDate = new Date(date)
  let startDateYear = startDate.getFullYear() + '-' + formatNumber(startDate.getMonth() + 1)
  return startDateYear
}
// 时间-时分秒
const formatHourMinSec = date =>{
  if(date.toString().indexOf('-') !== -1){
    date = date.replace(/-/g, '/')
  }
  let startDate = new Date(date)
  let startDateYear = startDate.getHours() + ':' + formatNumber(startDate.getMinutes()) + ':' + formatNumber(startDate.getSeconds())
  return startDateYear
}
// 时间-时间戳(秒)
const formatStamp = date => {
  let hours = date.split(':')[0] * 60 * 60
  let minute = date.split(':')[1] * 60
  let second = date.split(':')[2] * 1
  let stamp = hours + minute + second
  return stamp
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 时间间隔 - 2分钟
const intervalTime = ( start, delay ) => {
  let startTime = new Date( start ); // 开始时间
  let endTime = new Date( startTime + ( delay * 60 * 1000 ) ); // 结束时间
  let delayTime = ( endTime - startTime ) / ( 60 * 1000 )
  console.log( 'startTime:', startTime )
  console.log( 'endTime:', endTime )
  console.log( 'delayTime:', delayTime )
  if( delayTime > delay && delayTime < ( delay*1 + 0.2 ) ){
    console.log( startTime, endTime )
  }


  // console.log(endTime - startTime); // 毫秒数
  // console.log(Math.floor((endTime - startTime) / 1000)); // 秒数
  // console.log(Math.floor((endTime - startTime) / 1000 / 60)); // 分钟
  // console.log(Math.floor((endTime - startTime) / 1000 / 60 / 60)); // 小时
  // console.log(Math.floor((endTime - startTime) / 1000 / 60 / 60 / 24)); // 天数
}


//金额(小写转大写)
const moneyCapitalize = money => {
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆','柒', '捌', '玖');
  var cnIntRadice = new Array('', '拾', '佰', '仟');
  var cnIntUnits = new Array('', '万', '亿', '兆');
  var cnDecUnits = new Array('角', '分', '毫', '厘');
  var cnInteger = '整';
  var cnIntLast = '元';
  var maxNum = 999999999999999.9999;
  var integerNum;
  var decimalNum;
  var chineseStr = '';
  var parts;
  if (money == '') {
    return '';
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    // 超出最大处理数字
    return '';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  // 转换为字符串
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
        var n = integerNum.substr(i, 1);
        var p = IntLen - i - 1;
        var q = p / 4;
        var m = p % 4;
        if (n == '0') {
            zeroCount++;
        } else {
            if (zeroCount > 0) {
                chineseStr += cnNums[0];
            }
            // 归零
            zeroCount = 0;
            chineseStr += cnNums[parseInt(n)]
                + cnIntRadice[m];
        }
        if (m == 0 && zeroCount < 4) {
            chineseStr += cnIntUnits[q];
        }
    }
    chineseStr += cnIntLast;
  }
  // 小数部分
  if (decimalNum != '') {
    var decLen = decimalNum.length;
    for (var i = 0; i < decLen; i++) {
        var n = decimalNum.substr(i, 1);
        if (n != '0') {
            chineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}

module.exports = {
  formatTime,
  formatYearMonthDay,
  formatYearMonth,
  formatHourMinSec,
  formatStamp,
  intervalTime
}
