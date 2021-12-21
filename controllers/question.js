const Quesiton = require("../models/Question");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const Question = require("../models/Question");

const askNewQuestion = asyncErrorWrapper(async (req, res, next) => {
  const information = req.body;
  const question = await Question.create({
    ...information,
    user: req.user.id,
  });
  res.status(200).json({
    success: true,
    data: question,
  });
});

//get all questions
const getAllQuestions = asyncErrorWrapper(async (req, res, next) => {
  const questions = await Question.find();
  return res.status(200).json({
    success: true,
    data: questions,
  });
});

//get single questions
const getSingleQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  return res.status(200).json({
    success: true,
    data: question,
  });
});

//editQuestion
const editQuestion = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const { title, content } = req.body;

  let question = await Quesiton.findById(id);

  question.title = title;
  question.content = content;

  question = await question.save();
  return res.status(200).json({
    success: true,
    data: question,
  });
});

module.exports = {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
};
