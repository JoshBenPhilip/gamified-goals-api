const { user } = require("firebase-functions/v1/auth");
const connectDb = require("./connectDb");

exports.createGoal = (request, response) => {
  const newGoal = {
    userId: request.body.userId,
    goal: request.body.goal,
    done: false,
  };
  const db = connectDb();
  db.collection("goals")
    .add(newGoal)
    .then((doc) => response.status(201).send(doc.id))
    .catch((err) => response.status(500).send(err));
};

exports.getGoals = (request, response) => {
  const db = connectDb();
  const { userId } = request.params;
  db.collection("goals")
    .where("userId", "==", userId)
    .get()
    .then((snapshot) => {
      const goalList = snapshot.docs.map((doc) => {
        let goal = doc.data();
        goal.id = doc.id;
        return goal;
      });
      response.send(goalList);
    })
    .catch((err) => response.status(500).send(err));
};

exports.updateGoal = (request, response) => {
  const { goalId } = request.params;
  const newGoal = request.body.goal;
  const db = connectDb();
  db.collection("goals")
    .doc(goalId)
    .update({ goal: newGoal })
    .then((doc) => response.status(202).send(doc))
    .catch((err) => response.status(500).send(err));
};
