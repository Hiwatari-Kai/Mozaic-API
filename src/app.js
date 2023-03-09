const express = require("express");
var cors = require("cors");
require("dotenv").config();
require("./db/mongoose");
const verifyClient = require("./middlewares/verifyClient");
const app = express();

const userRouter = require("./routers/user");
app.use(express.json());
app.use(cors());
app.use(verifyClient);
app.use(userRouter);


module.exports = app;
