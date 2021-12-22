const express = require("express");
const {
  getAccessToRoute,
  getAnswerOwnerAccess,
} = require("../middlewares/authorization/auth");
const {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
  getSingleAnswer,
  editAnswer,
  deleteAnswer,
} = require("../controllers/answer");
const {
  checkQuestionAndAnswerExist,
} = require("../middlewares/database/databaseErrorHelpers");

const router = express.Router({ mergeParams: true });

// add new answer to question
router.post("/", getAccessToRoute, addNewAnswerToQuestion);

//get all answers by question
router.get("/", getAllAnswersByQuestion);

//get single answer
router.get("/:answer_id", checkQuestionAndAnswerExist, getSingleAnswer);

//edit answer
router.put(
  "/:answer_id/edit",
  [checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess],
  editAnswer
);

//delete answer
router.delete(
  "/:answer_id/delete",
  [checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess],
  deleteAnswer
);

module.exports = router;
