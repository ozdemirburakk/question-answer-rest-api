const express = require("express");
const { json } = require("express/lib/response");
//api/questions
const router = express.Router();

router.get("/", (req, res) => {
  res
  .status(404)
  .json({
    success: false,
  });
});



module.exports = router;
