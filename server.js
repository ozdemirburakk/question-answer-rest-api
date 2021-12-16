const express = require("express");
const dotenv = require("dotenv");

const { connectDatabase } = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const routers = require("./routers");

//enviroment variables

dotenv.config({
  path: "./config/env/config.env",
});

//MongoDB Connection

connectDatabase();

const app = express();

//EXPRESS BODY MIDDLEWARE
app.use(express.json());

const PORT = process.env.PORT;

//Routers Middleware

app.use("/api", routers);

//Error Handler
app.use(customErrorHandler);

//Listen
app.listen(PORT, () => {
  console.log(`App Started on ${PORT}:${process.env.NODE_ENV}`);
});
