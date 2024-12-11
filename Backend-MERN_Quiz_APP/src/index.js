const express = require('express');
const connect = require("./configs/db.js");
const bodyParser = require("body-parser");
const cors = require('cors');

require('dotenv').config();

const Port = process.env.PORT || 3755;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Controllers
const loginAuth = require("./controller/auth.controller.js");
const registerAuth = require("./controller/auth.controller.js");
const quizAdd = require("./controller/quizAdd.controller.js");
const getquiz = require("./controller/quizAdd.controller.js");
const displayQuiz = require("./controller/displayQuiz.controller.js");
const user = require("./controller/auth.controller.js");
const userResult = require("./controller/userData.controller.js");

// Routes
app.use("/login", loginAuth); // Separate login route
app.use("/register", registerAuth); // Separate register route
app.use("/admin/quiz", quizAdd)
;app.use("/quiz", displayQuiz); // Separate controller for displaying quizzes
app.use("/user", user);
app.use("/userResult", userResult);
app.use("/quiz", getquiz);
// Start the server
app.listen(Port, async () => {
  try {
    await connect();
    console.log(`Listening on ${Port}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
