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

const SaveCard = async (cardid , department) => {
  return new Promise((async (resolve , reject) => {
    var item = {};
    item.timestamp = new Date().getTime();
    item.type = "card";
    item.id = cardid;
    item.department = department.department;
    item.departmentid= department.id;
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


const RegisterTimeInLog= async (user , department , cardid) => {
  return new Promise((async (resolve , reject ) => {
    try{
      console.log(user)
      const obj = DateConverter(new Date().getTime())
      const today = obj.intdate
      var item= {
        type: `timeinlog_${today}`,
        id: cardid,
        cardid: cardid,
        userid: user.id,
        timestamp: new Date().getTime(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        departmentid: department.id,
        department: department.department,
        timein: new Date().getTime(),
        status: "Present"
      }
      console.log(item)
      await dynamodbapi.addItem(item)
      resolve({
        message: "Timein log registered"
      })
    }catch(err){
      console.log(err);
      reject({
        error: "Internal server error in registering timein log"
      })
    }
   
  }))
  
}


const RegisterTimeOutLog= async (oldlog , hours ) => {
  return new Promise((async (resolve , reject ) => {
    try{
      var item = oldlog
      const obj = DateConverter(new Date().getTime())
      const today = obj.intdate
      var timein = oldlog.timein;
      var timeout = new Date().getTime();
      var difftimestamp = timeout - timein;
      var completedhours = (difftimestamp / 60 / 60 /1000)
      console.log(completedhours);
      console.log(hours)
      if(completedhours > hours){
        //completed duty
        item.type = "timeoutlog_"+today;
        item.completedhours = completedhours;
        item.timeout = timeout;
        item.status = "Timed Leave"
      }else{
        //early leave
        item.type = "earlyleavelog_"+today;
        item.completedhours =completedhours;
        item.timeout = timeout
        item.status = "Early Leave"
      }
      
      await dynamodbapi.deleteItem(oldlog.id ,`timeinlog_${today}` )
      await dynamodbapi.addItem(item);

      resolve({
        message: "Timein log registered"
      })
    }catch(err){
      console.log(err);
      reject({
        error: "Internal server error in registering timein log"
      })
    }
   
  }))
  
}

const FindTimeInLog = (cardid) => {
  return new Promise(((resolve , reject) => {
    try{
      const obj = DateConverter(new Date().getTime())
      const today = obj.intdate
      var params = {
        TableName : keys.Table,
        KeyConditionExpression: "#id = :id and  #type = :type",
        ExpressionAttributeNames:{
            "#id": "id",
            "#type": "type"
        },
        ExpressionAttributeValues: {
            ":id": cardid,
            ":type": `timeinlog_${today}`
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
              logfound: true,
              oldlog: data.Items[0]
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


const ValidateInput = (req , res , next) => {
  if(req.query.device_token && req.query.cardid){
    next()
  }else{
    res.status(400).json({
      status : "Invalid or missing parameters"
    })
  }

}


//Listen for card input
router.get("/api/read/card" , ValidateInput , async (req , res) => {
  try{
    var device_token =   req.query.device_token
     var cardid = req.query.cardid
     var Device = await GetDeviceInfo(device_token);
     var Userinfo = await validateUser(cardid);
     if(!Userinfo.userfound){
      await SaveCard(cardid , Device.device);
      return  res.status(400).json({
                  message : "Card discarded",
                  status: "Saved Card"
                })
     }
     var response = await FindTimeInLog(cardid);
     if(response.logfound){
       await RegisterTimeOutLog(response.oldlog , Device.device.hours);
       res.json({
        message : "Log registered",
        status: "out"
      })
     }else{
      await RegisterTimeInLog(Userinfo.user , Device.device ,  cardid );
      res.json({
        message : "Log registered",
        status: "in"
      })
     }
  
  }catch(err){
    console.log(err)
    res.status(400).json({
      status : "Card Discarded"
    })
  }
})


//add new device
router.post("/api/add/device" ,passport.authenticate('jwt',{session: false}) , async (req , res) => {
  try{
    
    var item = req.body.device;
    item.id = uuid.v4();
    item.timestamp = new Date().getTime()
    item.type = "device";
    console.log(item)
    await dynamodbapi.addItem(item);
    await counter.increaseDeviceCount(1);
    res.json({
      message : "Added device"
    })
  }catch(err){
    console.log(err)
    res.status(400).json({
      message : "Server error"
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


router.get("/test" , async (req , res) => {
 var device_token =   req.query.device_token
 var cardid = req.query.cardid
  try{
   var obj = await  GetDeviceInfo(device_token);
   await SaveCard(cardid , obj.device)
    res.json({
      reponse: obj
    })
  }catch(err){
    console.log(err);
    res.status(400).json({
      error : err
    })
  }
  
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


//route to delete item
router.put("/api/update/device" ,passport.authenticate('jwt',{session: false}) , async (req , res) => {
  try{
    var device = req.body.device
    console.log(device)
    var params = {
      TableName: keys.Table,
      Key: {
          "type": "device",
          "id": device.id
      },
      UpdateExpression: " SET #title = :title , #hours = :hours",
      ExpressionAttributeNames:{
          "#title":"title",
          "#hours": "hours"
      },
      ExpressionAttributeValues:{
          ":title": device.title,
          ":hours": device.hours
      },
      ReturnValues:"UPDATED_NEW"
  };
  console.log(params)
  docClient.update(params , (err , data) => {
    if(err){
      console.log(err);
      res.status(400).json({
        message: "Network or database error"
      })
    }else{
      res.json({
        message: "Updated device"
      })

    }
  })
}
  catch(err){
    console.log(err) 
    res.status(400).json({
      message: "Internal server error"
    })
  }
})

//Route to get all device list
router.get("/api/all/devices" , passport.authenticate('jwt',{session: false}) , (req ,res) => {
  console.log("fetching cards list")
  var params = {
    TableName : keys.Table,
    KeyConditionExpression: "#type = :type",
    ExpressionAttributeNames : {
      "#type": "type",
    },
    ExpressionAttributeValues: {
      ":type": "device"
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

//Route to get userlist by department
router.post("/api/paginated/userlist/:id" , passport.authenticate('jwt',{session: false}) , (req ,res) => {
  var departmentid = req.params.id
  console.log("fetching User list")
  var params = {
    TableName : keys.Table,
    IndexName: "type-departmentid-index",
    KeyConditionExpression: "#type = :type and #id =:id",
    ExpressionAttributeNames : {
      "#type": "type",
      "#id": "departmentid"
    },
    ExpressionAttributeValues: {
      ":type": "user",
      ":id": departmentid
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


//Route to get userlist by department
router.post("/api/paginated/presentlogs/:id" , passport.authenticate('jwt',{session: false}) , (req ,res) => {
  var departmentid = req.params.id
  const obj = DateConverter(new Date().getTime())
  const today = obj.intdate
  console.log("fetching todays timein list")
  var params = {
    TableName : keys.Table,
    IndexName: "type-departmentid-index",
    KeyConditionExpression: "#type = :type and #id =:id",
    ExpressionAttributeNames : {
      "#type": "type",
      "#id": "departmentid"
    },
    ExpressionAttributeValues: {
      ":type": `timeinlog_${today}`,
      ":id": departmentid
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


//Route to get early leave logs by department
router.post("/api/paginated/earlyleavelogs/:id/:timestamp" , passport.authenticate('jwt',{session: false}) , (req ,res) => {
  var departmentid = req.params.id
  var timestamp = Number(req.params.timestamp);
  const obj = DateConverter(timestamp)
  const today = obj.intdate
  console.log("fetching Early leave logs")
  var params = {
    TableName : keys.Table,
    IndexName: "type-departmentid-index",
    KeyConditionExpression: "#type = :type and #id =:id",
    ExpressionAttributeNames : {
      "#type": "type",
      "#id": "departmentid"
    },
    ExpressionAttributeValues: {
      ":type": `earlyleavelog_${today}`,
      ":id": departmentid
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


//Route to get completed leave logs by department
router.post("/api/paginated/completedlogs/:id/:timestamp" , passport.authenticate('jwt',{session: false}) , (req ,res) => {
  var departmentid = req.params.id
  var timestamp = Number(req.params.timestamp);
  const obj = DateConverter(timestamp)
  const today = obj.intdate
  console.log("fetching Completed leave logs")
  var params = {
    TableName : keys.Table,
    IndexName: "type-departmentid-index",
    KeyConditionExpression: "#type = :type and #id =:id",
    ExpressionAttributeNames : {
      "#type": "type",
      "#id": "departmentid"
    },
    ExpressionAttributeValues: {
      ":type": `timeoutlog_${today}`,
      ":id": departmentid
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



module.exports = router;