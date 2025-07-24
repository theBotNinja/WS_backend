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

const User = mongoose.model("Users",userSchema)

async function createUser(dataObj) {
  let user = User()
  
  //validation  of dataObj

  user.set(userObj)
  return await user.save()
}
async function updateUser(data) {
  try{
    //validate data

    const userupdated  = await User.findByIdAndUpdate(data)
    if (userupdated){
      return "update successfull"
    }else{
      return "Can't update"
    }
  }catch (err){
    console.log(err)
  }
  
}
async function deleteUser(UserId) {
  try{
    //auth and valiadte

    const userdeleted =  await User.findByIdAndDelete(UserId)
    if (userdeleted){
      return "Successfully Deleted"
    }else{
      return "user not found"
    }
  }catch (err){
    console.log(err)
  }
  return "try again later!"
}