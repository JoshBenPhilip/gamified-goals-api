const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getTasks, createTask, updateTask, deleteTask } = require("./src/tasks");
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
app.patch("/tasks/:taskId", deleteTask);

exports.api = functions.https.onRequest(app);
