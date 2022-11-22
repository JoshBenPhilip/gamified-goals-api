import { response, request } from "express";
import { user } from "firebase-functions/v1/auth";
import connectDb from "./connectDb";

exports.createTask = (request, response) => {
  const newTask = {
    userId: request.body.userId,
    done: false,
    deleted: false,
  };
  const db = connectDb();
  db.collection("tasks")
    .add(newTask)
    .then((doc) => response.status(201).send(doc.id))
    .catch((err) => response.status(500).send(err));
};

exports.createTaskWithTier = (request, response) => {
  const newTask = {
    userId: request.body.userId,
    taskTier: request.body.taskTier,
    taskParent: request.body.taskParent,
    done: false,
    deleted: false,
  };
  const db = connectDb();
  db.collection("tasks")
    .add(newTask)
    .then((doc) => response.status(201).send(doc.id))
    .catch((err) => response.status(500).send(err));
};

exports.getTasks = (request, response) => {
  const db = connectDb();
  const { userId } = request.params;
  db.collection("tasks")
    .where("userId", "==", userId)
    .where("deleted", "==", false)
    .get()
    .then((snapshot) => {
      const taskList = snapshot.docs.map((doc) => {
        let task = doc.data();
        task.id = doc.id;
        return task;
      });
      response.send(taskList);
    })
    .catch((err) => response.status(500).send(err));
};

exports.getTasksByTier = (request, response) => {
  const db = connectDb();
  const { userId } = request.params;
  const { taskTier } = request.params;
  db.collection("tasks")
    .where("userId", "==", userId)
    .where("deleted", "==", false)
    .where("taskTier", "==", taskTier)
    .get()
    .then((snapshot) => {
      const taskList = snapshot.docs.map((doc) => {
        let task = doc.data();
        task.id = doc.id;
        return task;
      });
      response.send(taskList);
    })
    .catch((err) => response.status(500).send(err));
};

exports.updateTask = (request, response) => {
  const { taskId } = request.params;
  const isDone = request.body.done;
  const db = connectDb();
  db.collection("tasks")
    .doc(taskId)
    .update({ done: isDone })
    .then((doc) => response.status(202).send(doc))
    .catch((err) => response.status(500).send(err));
};

exports.deleteTask = (request, response) => {
  const { taskId } = request.params;
  const db = connectDb();
  db.collection("tasks")
    .doc(taskId)
    .update({ deleted: true })
    .then((doc) => response.status(202).send(doc))
    .catch((err) => response.status(500).send(err));
};