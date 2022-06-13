const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getTasks, createTask, updateTask } = require("./src/tasks");
const PORT = process.env.PORT || 3005;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
  res.send("Gamified Goals");
});

// Routes
app.post("/tasks", createTask);
app.get("/tasks", getTasks);
app.patch("/tasks/:taskId", updateTask);

exports.api = functions.https.onRequest(app);