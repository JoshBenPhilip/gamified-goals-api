const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getTasks, createTask, updateTask } = require("./src/tasks");
const { createGoal, getGoals, updateGoal } = require("./src/goals");
const PORT = process.env.PORT || 3005;

const app = express();
app.use(cors());
app.use(express.json());

// app.use("/", (req, res) => {
//   res.send("Title Gamified Goals");
// });

// Routes
app.post("/tasks", createTask);
app.get("/tasks/:userId", getTasks);
app.patch("/tasks/:taskId", updateTask);

app.post("/goals", createGoal);
app.get("/goals/:userId", getGoals);
app.patch("/goals/:taskId", updateGoal);

exports.api = functions.https.onRequest(app);
