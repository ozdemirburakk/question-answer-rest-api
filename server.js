const express = require("express");
const dotenv = require("dotenv");

const {connectDatabase} = require("./helpers/database/connectDatabase");

const routers = require("./routers");

//enviroment variables

dotenv.config({
  path: "./config/env/config.env",
});

//MongoDB Connection

connectDatabase();

const app = express();
const PORT = process.env.PORT;

//Routers Middleware

app.use("/api", routers);

//Listen
app.listen(PORT, () => {
  console.log(`App Started on ${PORT}:${process.env.NODE_ENV}`);
});
