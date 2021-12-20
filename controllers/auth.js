const customErrorHandler = require("../middlewares/errors/customErrorHandler");
const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const {
  validateUserInput,
  comparePassword,
} = require("../helpers/input/inputHelpers");

//register
const register = asyncErrorWrapper(async (req, res, next) => {
  //POST DATA
  const { name, email, password, role } = req.body;
  // async,await
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  sendJwtToClient(user, res);
});

//login
const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!validateUserInput(email, password)) {
    return next(new CustomError("Please check your inputs", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!comparePassword(password, user.password)) {
    console.log("parola" + user.password);
    return next(new CustomError("Please check your credentials", 400));
  }

  sendJwtToClient(user, res);
});

//logout

const logout = asyncErrorWrapper(async (req, res, next) => {
  const { JWT_COOKIE_EXPIRE, NODE_ENV } = process.env;
  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "develpment" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfull",
    });
});

//getuser
const getUser = (req, res, next) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
    },
  });
};

//imageUpload

const imageUpload = asyncErrorWrapper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      profile_image: req.savedProfileImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Image Upload Successfull",
    data: user,
  });
});

module.exports = {
  register,
  login,
  getUser,
  logout,
  imageUpload,
};
