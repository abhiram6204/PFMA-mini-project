const express = require("express");

const {
  getBudget,
  getAllBudgets,
  addBudget,
  updateBudget,
  deleteBudget
} = require("../controllers/budget.controller");
const router = express.Router();

router.post("/", getAllBudgets);
router.route("/:id")
    .get(getBudget)
    .post(addBudget)
    .patch(updateBudget)
    .delete(deleteBudget);

module.exports = router;
