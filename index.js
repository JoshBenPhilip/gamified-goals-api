const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getTasks, createTask, updateTask } = require("./src/tasks");
const PORT = process.env.PORT || 3005;

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.post("/tasks", createTask);
app.get("/tasks", getTasks);
app.patch("/tasks/:taskId", updateTask);

app.listen(PORT, () => {
  console.log("Listening on Port: ", PORT);
});
