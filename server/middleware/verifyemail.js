const express = require("express");
const User = require("../models/UserModel");
const VerfiyEmail = async (req, res, next) => {
  const { email } = req.body;

  const verify = await User.findOne({ email: email });
  if (verify) {
    req.email = email;
    return next();
  }

  else {
    return res.status(400).json({ err: "Enter Correct Email Address" });
  }
};

module.exports = VerfiyEmail;
