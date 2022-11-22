const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  getTasks,
  createTask,
  updateTask,
  getTasksByTier,
  deleteTask,
  createTaskWithTier,
} = require("./src/tasks");
const PORT = process.env.PORT || 3005;

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.post("/tasks", createTask);
app.post("/createTaskWithTier", createTaskWithTier);
app.get("/tasks/:userId", getTasks);
app.get("/tasksByTier/:userId", getTasksByTier);
app.patch("/tasks/:taskId", updateTask);
app.patch("/tasks/delete/:taskId", deleteTask);

exports.api = functions.https.onRequest(app);
