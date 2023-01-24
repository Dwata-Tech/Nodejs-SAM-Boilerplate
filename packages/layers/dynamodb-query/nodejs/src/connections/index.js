const { DynamoDB } = require("aws-sdk");

module.exports.dynamodbClient = new DynamoDB.DocumentClient({ region: "us-east-1" });
