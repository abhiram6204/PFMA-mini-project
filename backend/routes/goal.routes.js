const express = require("express");

const {
  getGoal,
  getAllGoals,
  addGoal,
  updateGoal,
  deleteGoal
} = require("../controllers/goal.controller");
const router = express.Router();

router.post("/", getAllGoals);
router.route("/:id")
    .get(getGoal)
    .post(addGoal)
    .patch(updateGoal)
    .delete(deleteGoal);

module.exports = router;
