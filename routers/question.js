const express = require("express");
const { askNewQuestion,getAllQuestions } = require("../controllers/question");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
//api/questions
const router = express.Router();
router.get("/", getAllQuestions);
router.post("/ask",getAccessToRoute, askNewQuestion);

module.exports = router;
