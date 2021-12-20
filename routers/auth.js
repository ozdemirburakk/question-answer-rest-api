const express = require("express");
const { register, login, getUser, logout } = require("../controllers/auth");

const { getAccessToRoute } = require("../middlewares/authorization/auth");

//api/auth
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", getAccessToRoute, logout);
router.get("/profile", getAccessToRoute, getUser);
module.exports = router;
