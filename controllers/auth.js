const customErrorHandler = require("../middlewares/errors/customErrorHandler");
const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const register = async (req, res, next) => {
  //POST DATA
  const name = "Mert Peh";
  const email = "mert@peh.com";
  const password = "12345";

  //async,await

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return next(err);
  }
};

const errorTest = (req, res, next) => {
  //question doesnt exist
  return next(new TypeError("Type Error Message"));
};

module.exports = {
  register,
  errorTest,
};
