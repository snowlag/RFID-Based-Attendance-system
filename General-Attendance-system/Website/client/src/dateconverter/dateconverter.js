import moment from "moment"
const DateConverter = (timestamp) => {
   var Data = {
      date: moment(timestamp).format('Do MMMM YYYY'),
      datetime: moment(timestamp).format('Do MMMM YYYY, h:mm a'),
      time:  moment(timestamp).format('h:mm a'),
   }
   return Data
}

export default DateConverter;
