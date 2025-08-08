const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  "user": {
    "type": "ObjectId",
    "ref": "User",
    required:true
  },
  "location": {
    "type": "ObjectId",
    "ref": "Location"
  },
  "reportTitle":{type:"String",required:true},
  "reportDetails": "String",
  "reportType": {
    "type": "String"
  },
  "reportedAt": {type:Date,default:Date.now()}
});

const ReportModel = mongoose.model("Report",reportSchema)

module.exports = {ReportModel}