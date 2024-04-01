const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const apiError = require("../utils/apiError");

exports.register = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const user = await userModel.create({
    first_name,
    last_name,
    email,
    password,
  });

  res.status(201).json(user);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new apiError("Invalid Email or Passowrd"), 404);
  }
  if (password !== user.password) {
    return next(new apiError("Invalid Email or Passowrd"), 404);
  }

  res.status(200).json({
    success: true,
    message: `welcom MR.${user.first_name}`,
    first_name: user.first_name,
  });
});
