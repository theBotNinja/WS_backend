const express = require("express");
const ReportRoutes = express.Router();
const {ReportModel} = require("../models/report")
const auth = require("../middleware/auth");
const Joi = require("joi");

const reportTags = ["Harassment", "Assault", "Suspicious Activity", "Other"]
const reportSchema = Joi.object({
  location: Joi.string(),
  reportTitle: Joi.string().min(5).max(30).required(),
  reportDetails: Joi.string().required(),
  reportType: Joi.string().valid(...reportTags)
});

ReportRoutes.get("/",async (req, res) => {
  let result = await ReportModel.find().limit(10)
  res.status(200).send(result);
});
ReportRoutes.get("/my",auth,async (req, res) => {
  let result = await ReportModel.find({user:req.user._id})
  res.status(200).send(result);
});
ReportRoutes.get("/:reportid",async (req, res) => {
  let report = await ReportModel.findById(req.params.reportid)
  console.log(report)
  res.send(req.params.reportid);
});
ReportRoutes.post("/create", auth, async (req, res) => {
  if (!req.body) return res.status(400).send("no data")
  const {error} = reportSchema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  let report = new ReportModel()
  req.body.user = req.user._id
  report.set(req.body)
  let newreport = await report.save()
  res.status(200).send(newreport)
});

module.exports = ReportRoutes;
