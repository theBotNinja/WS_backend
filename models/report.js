const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  "user": {
    "type": "ObjectId",
    "ref": "User"
  },
  "location": {
    "type": "ObjectId",
    "ref": "Location"
  },
  "reportDetails": "String",
  "reportType": {
    "type": "String",
    "enum": ["Harassment", "Assault", "Suspicious Activity", "Other"]
  },
  "reportedAt": {type:Date,default:Date.now()}
});

const ReportModel = mongoose.model("report",reportSchema)

async function createReport(data){
  let newReport =  ReportModel()
  newReport.set(data)
  return await newReport.save()
}

module.exports = {createReport}