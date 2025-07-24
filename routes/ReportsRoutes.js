const express = require("express");
const ReportRoutes = express.Router();
const Joi = require("joi");
const { Report } = require("../models/report");

ReportRoutes.get("/", (req, res) => {
  res.status(200).send("Report get route");
});
ReportRoutes.get("/all",(req,res)=>{
  res.send("will give all reports")
})
ReportRoutes.get("/:reportid",(req,res)=>{
  res.send("will give with id reports")
})
ReportRoutes.post("/create",async (req, res) => {
  res.status(200).send("report form")
});


module.exports = ReportRoutes;
