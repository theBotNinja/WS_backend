const mongoose = require("mongoose")

const LocationSchema = new mongoose.Schema({
  "_id": "ObjectId",
  "address": "String",
  "location": {
    "type": "Point",
    "coordinates": ["Number", "Number"] // [longitude, latitude]
  },
  "zoneStatus": {
    "type": "String",
    "enum": ["Normal", "Yellow", "Red"],
    "default": "Normal"
  }
})