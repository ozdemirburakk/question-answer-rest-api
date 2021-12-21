const express = require("express");
const {
  getAccessToRoute,
  getAdminAccess,
} = require("../middlewares/authorization/auth");
const {
  checkUserExist,
} = require("../middlewares/database/databaseErrorHelpers");
const { blockUser } = require("../controllers/admin");

//Delete User
const router = express.Router();
router.use([getAccessToRoute, getAdminAccess]);

//Block User
router.get("/block/:id",checkUserExist, blockUser);

module.exports = router;
