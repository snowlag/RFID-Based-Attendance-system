const AWS = require('aws-sdk');
var keys = require("../config/keys");


AWS.config.update({
    region: "ap-south-1",
    accessKeyId : keys.AWS_ACCESS_KEY,
    secretAccessKey: keys.AWS_SECRET_ACCESS_KEY,
  });
  
  var dynamodb = new AWS.DynamoDB();
  var docClient = new AWS.DynamoDB.DocumentClient();

var counter = {}

counter.increaseDeviceCount = async (value) => {
    return new Promise((resolve , reject ) => {
        try{
        var params = {
            TableName: keys.Table,
            Key: {
                "type": "Counters",
                "id": "counter"
            },
            UpdateExpression: " SET #counter = #counter + :incva",
            ExpressionAttributeNames:{
                "#counter":"device_count"
            },
            ExpressionAttributeValues:{
                ":incva": value
            },
            ReturnValues:"UPDATED_NEW"
        };
        console.log(params)
        docClient.update(params , (err , data) => {
            if(err){
             if(err.code === "ValidationException"){
                        //Create new Counter
                        var params = {
                            TableName: keys.Table,
                            Item: {
                                type: "Counters",
                                id : "counter",
                                device_count: value
                            }
                           
                        }
                        console.log(params)
                        docClient.put(params , (err , data) => {
                            if(err){
                                console.log(err)
                                reject(false)                              
                            }else{
                                console.log("Initialized device count")
                                resolve(true)
                            }
                        })
                    }else{
                        console.log(err);
                        reject(false)
                    }
            }else{
              resolve(true)
            }
        })
    }catch(err){
        console.log(err)
    }
    })

}

counter.increaseSubjectCount = async (value) => {
    return new Promise((resolve , reject ) => {
        try{
        var params = {
            TableName: keys.Table,
            Key: {
                "type": "Counters",
                "id": "counter"
            },
            UpdateExpression: " SET #counter = #counter + :incva",
            ExpressionAttributeNames:{
                "#counter":"subject_count"
            },
            ExpressionAttributeValues:{
                ":incva": value
            },
            ReturnValues:"UPDATED_NEW"
        };
        console.log(params)
        docClient.update(params , (err , data) => {
            if(err){
             if(err.code === "ValidationException"){
                        //Create new Counter
                        var params = {
                            TableName: keys.Table,
                            Item: {
                                type: "Counters",
                                id : "counter",
                                subject_count: value
                            }
                           
                        }
                        console.log(params)
                        docClient.put(params , (err , data) => {
                            if(err){
                                console.log(err)
                                reject(false)                              
                            }else{
                                console.log("Initialized subject count")
                                resolve(true)
                            }
                        })
                    }else{
                        console.log(err);
                        reject(false)
                    }
            }else{
              resolve(true)
            }
        })
    }catch(err){
        console.log(err)
    }
    })

}



counter.increaseAttendeeCount = async (value) => {
    return new Promise((resolve , reject ) => {
        try{
        var params = {
            TableName: keys.Table,
            Key: {
                "type": "Counters",
                "id": "counter"
            },
            UpdateExpression: " SET #counter = #counter + :incva",
            ExpressionAttributeNames:{
                "#counter":"attendees_count"
            },
            ExpressionAttributeValues:{
                ":incva": value
            },
            ReturnValues:"UPDATED_NEW"
        };
        console.log(params)
        docClient.update(params , (err , data) => {
            if(err){
             if(err.code === "ValidationException"){
                        //Create new Counter
                        var params = {
                            TableName: keys.Table,
                            Key: {
                                "type": "Counters",
                                "id": "counter"
                            },
                            UpdateExpression: " SET #counter = :incva",
                            ExpressionAttributeNames:{
                                "#counter":"attendees_count"
                            },
                            ExpressionAttributeValues:{
                                ":incva": value
                            },
                            ReturnValues:"UPDATED_NEW"
                        };
                        console.log(params)
                        docClient.update(params , (err , data) => {
                            if(err){
                                console.log(err)
                                reject(false)                              
                            }else{
                                console.log("Initialized attendees count")
                                resolve(true)
                            }
                        })
                    }else{
                        console.log(err);
                        reject(false)
                    }
            }else{
              resolve(true)
            }
        })
    }catch(err){
        console.log(err)
    }
    })

}



counter.increaseUserSubjectAttendance = async (value , userid , subjectname) => {
    return new Promise((resolve , reject ) => {
        try{
        var params = {
            TableName: keys.Table,
            Key: {
                "type": "user",
                "id": userid
            },
            UpdateExpression: " SET #counter = #counter + :incva",
            ExpressionAttributeNames:{
                "#counter":subjectname
            },
            ExpressionAttributeValues:{
                ":incva": value
            },
            ReturnValues:"UPDATED_NEW"
        };
        console.log(params)
        docClient.update(params , (err , data) => {
            if(err){
             if(err.code === "ValidationException"){
                        //Create new Counter
                        var params = {
                            TableName: keys.Table,
                            Key: {
                                "type": "user",
                                "id": userid
                            },
                            UpdateExpression: " SET #counter = :incva",
                            ExpressionAttributeNames:{
                                "#counter":subjectname
                            },
                            ExpressionAttributeValues:{
                                ":incva": value
                            },
                            ReturnValues:"UPDATED_NEW"
                        };
                        console.log(params)
                        docClient.update(params , (err , data) => {
                            if(err){
                                console.log(err)
                                reject(false)                              
                            }else{
                                console.log("Initialized subject attendance count")
                                resolve(true)
                            }
                        })
                    }else{
                        console.log(err);
                        reject(false)
                    }
            }else{
              resolve(true)
            }
        })
    }catch(err){
        console.log(err)
    }
    })

}

counter.increaseUserCount = async (value) => {
    return new Promise((resolve , reject ) => {
        try{
        var params = {
            TableName: keys.Table,
            Key: {
                "type": "Counters",
                "id": "counter"
            },
            UpdateExpression: " SET #counter = #counter + :incva",
            ExpressionAttributeNames:{
                "#counter":"User"
            },
            ExpressionAttributeValues:{
                ":incva": value
            },
            ReturnValues:"UPDATED_NEW"
        };
        console.log(params)
        docClient.update(params , (err , data) => {
            if(err){
             if(err.code === "ValidationException"){
                        //Create new Counter
                        var params = {
                            TableName: keys.Table,
                            Item: {
                                type: "Counters",
                                id : "counter",
                                User: 1,
                            }
                           
                        }
                        console.log(params)
                        docClient.put(params , (err , data) => {
                            if(err){
                                console.log(err)
                                reject(false)                              
                            }else{
                                console.log("Initialized")
                                resolve(true)
                            }
                        })
                    }else{
                        console.log(err);
                        reject(false)
                    }
            }else{
              resolve(true)
            }
        })
    }catch(err){
        console.log(err)
    }
    })

}




counter.modifycount = async (value , type) => {
    var type = type
    return new Promise((resolve , reject ) => {
        var params = {
            TableName: keys.Rwtable,
            Key: {
                "type": type,
                "timestamp": 0
            },
            UpdateExpression: " SET #counter = #counter + :incva",
            ExpressionAttributeNames:{
                "#counter":"dcount"
            },
            ExpressionAttributeValues:{
                ":incva": value
            },
            ReturnValues:"UPDATED_NEW"
        };
        console.log(params);
        docClient.update(params , (err , data) => {
            if(err){
             if(err.code === "ValidationException"){
                        //Create new Counter
                        var params = {
                            TableName: keys.Rwtable,
                            Item: {
                                type: type,
                                timestamp: 0,
                                dcount: value,
                            }
                           
                        }
                        docClient.put(params , (err , data) => {
                            if(err){
                                reject({
                                    message : "Error updating counter"
                                })                          
                            }else{
                                console.log("Made new Counter")
                                resolve({
                                    action_completed: true
                                })
                            }
                        })
                    }else{
                        console.log(err);
                        reject({
                            message : "Error updating counter"
                        })
                    }
            }else{
                console.log(data)
                resolve({
                    action_completed: true
                })
            }
        })
    })
}

module.exports = counter;