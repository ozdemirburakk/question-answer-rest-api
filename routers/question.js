const express = require("express");
const {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion,
} = require("../controllers/question");
const {
  getAccessToRoute,
  getQuestionOwnerAccess,
} = require("../middlewares/authorization/auth");
const {
  checkQuestionExist,
} = require("../middlewares/database/databaseErrorHelpers");

//api/questions
const router = express.Router();
//like question
router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion);

//undolike
router.get(
  "/:id/undolike",
  [getAccessToRoute, checkQuestionExist],
  undoLikeQuestion
);

//get all questions
router.get("/", getAllQuestions);

//get single question by id
router.get("/:id", checkQuestionExist, getSingleQuestion);

//ask new question
router.post("/ask", getAccessToRoute, askNewQuestion);

//edit question
router.put(
  "/:id/edit",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
);

//delete question
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  deleteQuestion
);
module.exports = router;
