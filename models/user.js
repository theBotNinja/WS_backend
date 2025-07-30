const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  "firstName": "String",
  "lastName": "String",
  "email": {
    "type": "String",
    "unique": true,
    "required": true
  },
  "password": "String",
  "phoneNumber": {
    "type": "String",
    "unique": true,
    "required": true
  },
  "emergencyContacts": [
    {
      "contactName": "String",
      "phoneNumber": "String",
      "relationship": "String"
    }
  ],
  "createdAt": {type:Date ,default:Date.now()}
});

const UserModel = mongoose.model("Users",userSchema)

async function createUser(data){
  let newUser = UserModel()
  newUser.set(data)
  return await newUser.save()
}
module.exports = {UserModel}