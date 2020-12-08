const AWS = require('aws-sdk');
var keys = require("../config/keys");
const { Route53Resolver } = require('aws-sdk');


AWS.config.update({
    region: "ap-south-1",
    accessKeyId : keys.AWS_ACCESS_KEY,
    secretAccessKey: keys.AWS_SECRET_ACCESS_KEY,
  });
  
  var dynamodb = new AWS.DynamoDB();
  var docClient = new AWS.DynamoDB.DocumentClient();
var dynamodbapi = {}

dynamodbapi.addItem =async  (item) => {
    return new Promise((resolve , reject) => {
        var params = {
            TableName: keys.Table,
            Item : item
        }
        docClient.put(params , async (err , data) => {
            if(err){
                console.log(err)
                reject({
                    error: "Database error"
                })
            }else{
                console.log("Added given item")
                resolve(true)
            }
        })
    })
   
}


dynamodbapi.deleteItem = (id , type) => {

    return new Promise(((resolve , reject) => {
        var params = {
            TableName: keys.Table,
            Key: {
              type : type,
              id: id
            }
          }
      docClient.delete(params , async (err ,data) => {
          if(err){
              console.log(err)
              reject({
                  error: "Database error"
              })
          }else{
              console.log("Item Deleted");
              console.log(params);
              console.log(data)
              resolve({
                  message : "Item deleteted"
              })
          }
      })
    }))
   
}



module.exports = dynamodbapi