const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema(
  {
  "_id": "ObjectId",
  "user": {
    "type": "ObjectId",
    "ref": "User"
  },
  "report": {
    "type": "ObjectId",
    "ref": "Report",
    "required": false
  },
  "location": {
    "type": "Point",
    "coordinates": ["Number", "Number"]
  },
  "alertType": {
    "type": "String",
    "enum": ["SOS", "Distress Signal"]
  },
  "status": {
    "type": "String",
    "enum": ["Sent", "Acknowledged", "Resolved"],
    "default": "Sent"
  },
  "sentAt": "Date"
}
);
