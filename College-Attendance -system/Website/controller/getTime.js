var moment = require("moment")
const DateConverter = (timestamp) => {
    if(!timestamp){
      var  timestamp = new Date().getTime();
    }
     
    var month = moment(timestamp).utcOffset("+05:30").format('M');
    var day   = ("0" + moment(timestamp).utcOffset("+05:30").format('D')).slice(-2);
    var year  = moment(timestamp).utcOffset("+05:30").format('YYYY');

    const StringDate = moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')

    const IntDate = Number(`${day}${month}${year}`)
    return {
        strdate: StringDate,
        intdate: IntDate
    }
   }

   module.exports = DateConverter;