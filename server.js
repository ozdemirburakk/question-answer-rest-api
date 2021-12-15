const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers");

//enviroment variables

dotenv.config({
  path: "./config/env/config.env",
});

const app = express();
const PORT = process.env.PORT;

//Routers Middleware

app.use("/api", routers);

//Listen
app.listen(PORT, () => {
  console.log(`App Started on ${PORT}:${process.env.NODE_ENV}`);
});
