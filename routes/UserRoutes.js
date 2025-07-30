const express = require("express");
const _ = require("lodash")
const bcrypt = require("bcrypt")
const {UserModel} = require("../models/user");
const UserRoutes = express.Router();
const Joi = require('joi');

const schema = Joi.object({
  "firstName": Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
  "lastName": Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
  "email":Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  "password": Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  "phoneNumber": Joi.string()
        .alphanum()
        .min(10)
        .required(),
  "emergencyContacts": [
    {
      "contactName":Joi.string()
        .alphanum()
        .min(3)
        .max(30),
      "phoneNumber": Joi.string()
        .alphanum()
        .min(10),
      "relationship": Joi.string()
        .alphanum()
        .min(3)
        .max(10)
    }
  ],
  "createdAt": {type:Date ,default:Date.now()}
})


UserRoutes.get("/",(req,res)=>{
    res.status(200).send("User show user porfile")
});

UserRoutes.post("/create",async (req,res)=>{
    if (! req.body ){
        res.status(400).send("bad request")
        return
    }
    const {error} = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let user = await UserModel.findOne({email:req.body.email})
    if (user) return res.status(400).send("user already exists!")
    user = new UserModel()
    user.set(_.pick(req.body,["firstName","lastName","email","phoneNumber","emergencyContacts"]))
    const salt = await bcrypt.genSalt(5)
    const hashed = await bcrypt.hash(req.body.password,salt)
    user.password = hashed
    await user.save()
    res.send(_.pick(user,["firstName","email","_id"]))
});
module.exports = UserRoutes;

