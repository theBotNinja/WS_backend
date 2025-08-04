const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
  firstName: "String",
  lastName: "String",
  email: {
    type: "String",
    unique: true,
    required: true,
  },
  password: "String",
  phoneNumber: {
    type: "String",
    unique: true,
    required: true,
  },
  emergencyContacts: [
    {
      contactName: "String",
      phoneNumber: "String",
      relationship: "String",
    },
  ],
  createdAt: { type: Date, default: Date.now() },
});
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    _.pick(this, ["_id", "firstName", "email"]),
    process.env.JWT_privateKey
  );
};
const UserModel = mongoose.model("Users", userSchema);
module.exports = { UserModel };
