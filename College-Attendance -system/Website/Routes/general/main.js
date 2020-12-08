const passport = require("passport");
const dynamodbapi = require("../../controller/general");
var express = require("express"),
    router  = express.Router(),
    AWS = require("aws-sdk"),
    uuid = require("uuid");
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    bcrypt = require("bcrypt"),
    keys = require("../../config/keys"),
    jwt = require("jsonwebtoken"),
    request = require("request"),
    DateConverter = require("../../controller/getTime");
    counter = require("../../controller/counters")
    moment = require("moment")
//Body Parser -------------------
router.use(bodyParser.urlencoded({extended : false}));
router.use(methodOverride("_method"));
router.use(bodyParser.json()); 


// -------------------------------------Aws Configuration------------------------------------------------------------
AWS.config.update({
    region: "ap-south-1",
    accessKeyId : keys.AWS_ACCESS_KEY,
    secretAccessKey: keys.AWS_SECRET_ACCESS_KEY
  });
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
//---------------------------------------------------------------------------------------------------------------------------

const SaveCard = async (cardid ) => {
  return new Promise((async (resolve , reject) => {
    var item = {};
    item.timestamp = new Date().getTime();
    item.type = "card";
    item.id = cardid;
    console.log(item)
    await dynamodbapi.addItem(item);
    resolve(true)
  }))
 
}



const GetDeviceInfo = async (id) => {
  return new Promise(((resolve , reject) => {
    var params = {
      TableName : keys.Table,
      KeyConditionExpression: "#id = :id and  #type = :type",
      ExpressionAttributeNames:{
          "#id": "id",
          "#type": "type"
      },
      ExpressionAttributeValues: {
          ":id": id,
          ":type": "device"
      },
   };
   docClient.query(params , (err , data) => {
     if(err){
       console.log(err);
       reject({
         devicefound: false,
         error: "Internal code error"
       })
     }else{
       console.log(params)
       console.log(data)
       if(data.Items.length> 0){
          resolve({
            devicefound: true,
            department: data.Items[0].department,
            device: data.Items[0]
          })
       }else{
        reject({
          devicefound: false,
          error: "Card not found"
        })
       }
     }
   })
  }))
}

const validateUser = async (cardid) => {
  return new Promise(((resolve , reject) => {
    var params = {
      TableName : keys.Table,
      IndexName: "type-cardid-index",
      KeyConditionExpression: "#id = :id and  #type = :type",
      ExpressionAttributeNames:{
          "#id": "cardid",
          "#type": "type"
      },
      ExpressionAttributeValues: {
          ":id": cardid,
          ":type": "user"
      },
   };
   docClient.query(params , (err , data) => {
     if(err){
       console.log(err);
       reject({
         userfound: false,
         error: "Internal code error"
       })
     }else{
       if(data.Items.length> 0){
          resolve({
            userfound: true,
            user: data.Items[0]
          })
       }else{
        resolve({
          userfound: false,
          error: "user not found"
        })
       }
     }
   })
  }))
}






const ValidateInput = (req , res , next) => {
  if(req.query.device_token && req.query.cardid && req.query.device_token === keys.authtoken){
    next()
  }else{
    res.status(400).json({
      status : "Invalid or missing parameters"
    })
  }

}

const FindAttendanceLog = (userid , lectureid) => {
  return new Promise(((resolve , reject) => {
    try{
      const obj = DateConverter(new Date().getTime())
      const today = obj.intdate
      var params = {
        TableName : keys.Table,
        IndexName: "userid-lectureid-index",
        KeyConditionExpression: "#uid = :uid and  #lid = :lid",
        ExpressionAttributeNames:{
            "#uid": "userid",
            "#lid": "lectureid"
        },
        ExpressionAttributeValues: {
            ":uid": userid,
            ":lid": lectureid
        },
     };
     docClient.query(params , (err , data) => {
       if(err){
         console.log(err);
         reject({
           logfound: false,
           error: "Internal code error"
         })
       }else{
         console.log(params)
         console.log(data)
         if(data.Items.length> 0){
            resolve({
              logfound: true,
            })
         }else{
          resolve({
            logfound: false,
          })
         }
       }
     })
    }catch(err){
      reject({
        error: "Internal server error in finding timein log"
      })
    }
  
  }))
}



const FindActiveLecture = async (timestamp) => {
  return new Promise(((resolve , reject) => {
    var time = moment(timestamp).utcOffset("+05:30").format('HHmm');
    var day = moment(timestamp).utcOffset("+05:30").format('dddd');
    var type = `${day}_lecture`
  
    var params = {
      TableName : keys.Table,
      KeyConditionExpression: "#type = :type",
      ExpressionAttributeNames:{        
          "#type": "type",
      },
      ExpressionAttributeValues: {
          ":type": type,       
      },
    
   };
   docClient.query(params , (err , data) => {
     if(err){
       console.log(err)
       reject({
         message: "Server error while finding active lecture"
       })
  
     }else{
      if(data.Items.length > 0){
        const result = data.Items.filter(lec =>  (time > lec.start_time && time < lec.end_time));
        console
        if(result.length === 1){
            resolve({
              lecturefound: true,
              data: result[0]
            })
        }else if(result.length > 1){
          resolve({
            lecturefound: false,
            status: "Multiple active lecture"
          })
        }else{
          resolve({
            lecturefound: false,
            status: "No active lecture"
          })
        }
      }else{
        resolve({
          lecturefound: false,
          status: "No active lecture"
        })
        
      }
     
     }
   })
  }))
 
}

const RegisterAttendance= async (user , lecture , cardid) => {
  return new Promise((async (resolve , reject ) => {
    try{
      console.log(user)
      const obj = DateConverter(new Date().getTime())
      const today = obj.intdate;
      var time =  moment(new Date().getTime()).utcOffset("+05:30").format('HHmm')
      var item= {
        type: `attendance_${today}`,
        id: uuid.v4(),
        cardid: cardid,
        userid: user.id,
        lectureid: lecture.id,
        timestamp: new Date().getTime(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        parent_id: lecture.parent_id,
        subject: lecture.subjectname,
        timein: moment(new Date().getTime()).utcOffset("+05:30").format('LT'),
        time: time,
        status: (time - lecture.start_time > (lecture.end_time - lecture.start_time)/4 ) ? "Late Attendance": "Arrived in time",
        lecture_start_time: lecture.start_formatted_time,
        lecture_end_time: lecture.end_formatted_time,
        rollno: user.rollno ? user.rollno : 0
      }
      console.log(item)
      await dynamodbapi.addItem(item)
      resolve({
        message: "Attendance registered"
      })
    }catch(err){
      console.log(err);
      reject({
        error: "Internal server error in attendance log"
      })
    }
   
  }))
  
}



//Listen for card input
router.get("/api/read/card" , ValidateInput , async (req , res) => {
  try{
    
     var cardid = req.query.cardid

     //check if card is registered to user
     var Userinfo = await validateUser(cardid);
     if(!Userinfo.userfound){
      await SaveCard(cardid );
      return  res.status(400).json({
                  message : "Card discarded",
                  status: "Saved Card"
                })
     }


    //Find active lecture
     var ActiveLecture = await FindActiveLecture();
     if(!ActiveLecture.lecturefound){
      return  res.status(400).json({
                  message : "No active lectures",
                })
     }
    

    
     //Check if user has already swipped card
     var CardLogs = await FindAttendanceLog(Userinfo.user.id , ActiveLecture.data.id)
     if(CardLogs.logfound){
      return  res.status(400).json({
                  message : "Card discarded",
                  status: "Already attendance has been registered for particular lecture"
                })
     }

     var response = await RegisterAttendance(Userinfo.user , ActiveLecture.data , cardid)
     var updateuserresponse =  await counter.increaseUserSubjectAttendance(1 , Userinfo.user.id , ActiveLecture.data.subjectname );
     res.json({
       message : "Attendance registered",
       subject: ActiveLecture.data.subjectname
     })
  
  }catch(err){
    console.log(err)
    res.status(400).json({
      status : "Card Discarded"
    })
  }
})




//add new user
router.post("/api/add/user" ,passport.authenticate('jwt',{session: false}) , async (req , res) => {
  try{
    
    var item = req.body.user;
    item.id = uuid.v4();
    item.timestamp = new Date().getTime()
    item.type = "user";
    console.log(item)
    await dynamodbapi.addItem(item);
    await dynamodbapi.deleteItem(item.cardid , "card")
    await counter.increaseAttendeeCount(1);
    res.json({
      message : "Added user"
    })
  }catch(err){
    console.log(err)
    res.status(400).json({
      message : "Server error"
    })
  }
})



//Route to get device list
router.post("/api/paginated/devicelist" , passport.authenticate('jwt',{session: false}) , (req ,res) => {
  console.log("fetching device list")
  var params = {
    TableName : keys.Table,
    KeyConditionExpression: "#type = :type",
    ExpressionAttributeNames : {
      "#type": "type"
    },
    ExpressionAttributeValues: {
      ":type": "device"
    },
    ScanIndexForward : false,
    Limit: 20
  }
 if(req.body.LastEvaluatedKey && req.body.LastEvaluatedKey.id){
        params.ExclusiveStartKey = req.body.LastEvaluatedKey;
    }
docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
       console.log(params);
        res.json(data)
}}
)   
})



//Route to get device list
router.post("/api/paginated/cardlist" , passport.authenticate('jwt',{session: false}) , (req ,res) => {
  console.log("fetching cards list")
  var params = {
    TableName : keys.Table,
    KeyConditionExpression: "#type = :type",
    ExpressionAttributeNames : {
      "#type": "type"
    },
    ExpressionAttributeValues: {
      ":type": "card"
    },
    Limit: 20
  }
 if(req.body.LastEvaluatedKey && req.body.LastEvaluatedKey.id){
        params.ExclusiveStartKey = req.body.LastEvaluatedKey;
    }
docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
       console.log(data);
        res.json(data)
}}
)   
})




//route to delete item
router.post("/api/delete/item" ,passport.authenticate('jwt',{session: false}) , async (req , res) => {
  try{
    var item = req.body.item;
    await dynamodbapi.deleteItem(item.id , item.type)
    res.json({
      message: "Item deleted"
    })
  }catch(err){
    console.log(err) 
    res.status(400).json({
      message: "Internal server error"
    })
  }
})



//Route to get userlist by department
router.post("/api/paginated/userlist" , passport.authenticate('jwt',{session: false}) , (req ,res) => {
  var departmentid = req.params.id
  console.log("fetching User list")
  var params = {
    TableName : keys.Table,
    KeyConditionExpression: "#type = :type",
    ExpressionAttributeNames : {
      "#type": "type",     
    },
    ExpressionAttributeValues: {
      ":type": "user",
    },
    Limit: 20
  }
 if(req.body.LastEvaluatedKey && req.body.LastEvaluatedKey.id){
        params.ExclusiveStartKey = req.body.LastEvaluatedKey;
    }
docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
       console.log(data);
        res.json(data)
}}
)   
})


//Route to get completed leave logs by department
router.post("/api/paginated/attendance/:id/:timestamp" , passport.authenticate('jwt',{session: false}) , (req ,res) => {
  var parentid = req.params.id
  var timestamp = Number(req.params.timestamp);
  const obj = DateConverter(timestamp)
  const today = obj.intdate
  console.log("fetching Completed leave logs")
  var params = {
    TableName : keys.Table,
    IndexName: "type-parent_id-index",
    KeyConditionExpression: "#type = :type and #id =:id",
    ExpressionAttributeNames : {
      "#type": "type",
      "#id": "parent_id"
    },
    ExpressionAttributeValues: {
      ":type": `attendance_${today}`,
      ":id": parentid
    },
    Limit: 20
  }
 if(req.body.LastEvaluatedKey && req.body.LastEvaluatedKey.id){
        params.ExclusiveStartKey = req.body.LastEvaluatedKey;
    }
docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log(params)
       console.log(data);
        res.json(data)
}}
)   
})



//Add new lecture
router.post("/api/add/lecture" ,passport.authenticate('jwt',{session: false}) , async (req , res) => {
  try{
    var item = req.body.lecture;
    item.id = uuid.v4();
    item.timestamp = new Date().getTime()
    item.type = `${item.day}_lecture`;
    item.parent_id = item.subject.id
    item.subjectname = item.subject.title
    item.teacher = item.subject.teacher
    // item.start_time = moment(item.start).utcOffset("+05:30").format('HHmm')
    // item.end_time = moment(item.end). utcOffset("+05:30").format('HHmm')
    item.start_time = Number(item.start_time_string.replace(":", ""));
    item.end_time = Number(item.end_time_string.replace(":", ""));
    item.start_formatted_time =  moment(item.start_time , 'HHmm').format('LT')
    item.end_formatted_time =  moment(item.end_time , 'HHmm').format('LT')
    delete item.start_time_string;
    delete item.end_time_string;
    delete item.subject
    console.log(item)
    await dynamodbapi.addItem(item);
    res.json({
      message : "Added Lecture"
    })
  }catch(err){
    console.log(err)
    res.status(400).json({
      message : "Server error"
    })
  }
})



//Add new subject
router.post("/api/add/subject" ,passport.authenticate('jwt',{session: false}) , async (req , res) => {
  try{
    var item = req.body.subject;
    item.id = uuid.v4();
    item.timestamp = new Date().getTime()
    item.type = `subject`;
    console.log(item)
    await dynamodbapi.addItem(item);
    await counter.increaseSubjectCount(1);
    res.json({
      message : "Added subject"
    })
  }catch(err){
    console.log(err)
    res.status(400).json({
      message : "Server error"
    })
  }
})

//Route to get all subject list
router.get("/api/all/subjects" , passport.authenticate('jwt',{session: false}) , (req ,res) => {
  console.log("fetching subject list")
  var params = {
    TableName : keys.Table,
    KeyConditionExpression: "#type = :type",
    ExpressionAttributeNames : {
      "#type": "type",
    },
    ExpressionAttributeValues: {
      ":type": "subject"
    },
  }
docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        res.json(data.Items)
}}
)   
})

//Route to get paginated subject list


//Route to get device list
router.post("/api/paginated/subjectlist" , passport.authenticate('jwt',{session: false}) , (req ,res) => {
  console.log("fetching Subjects list paginated")
  var params = {
    TableName : keys.Table,
    KeyConditionExpression: "#type = :type",
    ExpressionAttributeNames : {
      "#type": "type"
    },
    ExpressionAttributeValues: {
      ":type": "subject"
    },
    Limit: 20
  }
 if(req.body.LastEvaluatedKey && req.body.LastEvaluatedKey.id){
        params.ExclusiveStartKey = req.body.LastEvaluatedKey;
    }
docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
       console.log(data);
        res.json(data)
}}
)   
})

router.post("/api/paginated/lecturelist/:day" , passport.authenticate('jwt',{session: false}) , (req ,res) => {
  console.log("fetching lecture list paginated")
  var type = `${req.params.day}_lecture`
  var params = {
    TableName : keys.Table,
    KeyConditionExpression: "#type = :type",
    ExpressionAttributeNames : {
      "#type": "type"
    },
    ExpressionAttributeValues: {
      ":type": type
    },
    Limit: 20
  }
 if(req.body.LastEvaluatedKey && req.body.LastEvaluatedKey.id){
        params.ExclusiveStartKey = req.body.LastEvaluatedKey;
    }
docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
       console.log(data);
        res.json(data)
}}
)   
})



//Route to get all defaulter list
router.post("/api/logs/defaulters" , passport.authenticate('jwt',{session: false}) , (req ,res) => {
  console.log("fetching defaulter list")
  var subjectname = req.body.subjectname;
  var limit = req.body.limit
  var params = {
    TableName : keys.Table,
    KeyConditionExpression: "#type = :type",
    ExpressionAttributeNames : {
      "#type": "type",
      "#name": "name",
      "#email": "email",
      "#subject": subjectname,
      "#rollno": "rollno"
    },
    ExpressionAttributeValues: {
      ":type": "user"
    },
    ProjectionExpression: "#name , #email , #rollno , #subject "
  }
docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        res.status(400).json({
          message: "Network or server error"
        })
    } else {
        const result = data.Items.filter(lec =>  ((lec[`${subjectname}`] ? lec[`${subjectname}`] : 0) < limit));
        res.json(result)
}}
)   
})




module.exports = router;