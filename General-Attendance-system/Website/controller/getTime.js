const DateConverter = (timestamp) => {
    if(!timestamp){
      var  timestamp = new Date().getTime();
    }
    let date_ob = new Date(timestamp);
    console.log(date_ob)
    let date = ("0" + date_ob.getDate()).slice(-2);
    console.log(date)
    let month = date_ob.getMonth() + 1
    let year = date_ob.getUTCFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes()
    let seconds = date_ob.getSeconds();
    const StringDate = year + "/" + month + "/" + date + " " + hours + ":" + minutes + ":" + seconds;
    const IntDate = Number(`${date}${month}${year}`)
    return {
        strdate: StringDate,
        intdate: IntDate
    }
   }

   module.exports = DateConverter;