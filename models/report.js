const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  "_id": "ObjectId",
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
  "reportedAt": "Date"
});