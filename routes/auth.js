const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user");
const authRoute = express.Router();
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

authRoute.get("/", (req, res) => {
  res.status(200).send("User show user porfile");
});

authRoute.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");
  const TOKEN = user.generateAuthToken();
  res.send(TOKEN);
});

module.exports = authRoute;
