const express = require("express");
const { register, login, getUser, logout,imageUpload } = require("../controllers/auth");
const profileImageUpload = require("../middlewares/libraries/profileImageUpload");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

//api/auth
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", getAccessToRoute, logout);
router.get("/profile", getAccessToRoute, getUser);
router.post(
  "/upload",
  [getAccessToRoute, profileImageUpload.single("profile_image")],
  imageUpload
);
module.exports = router;
