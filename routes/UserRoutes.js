const express = require("express")
const UserRoutes = express.Router();

UserRoutes.get("/",(req,res)=>{
    res.status(200).send("User show user porfile")
});
UserRoutes.post("/create",(req,res)=>{
    res.status(200).send("create user form")
});
module.exports = UserRoutes;

