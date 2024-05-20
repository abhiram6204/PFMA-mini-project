const express = require("express");

const {
  getIncome,
  getAllIncome,
  addIncome,
  updateIncome,
  deleteIncome
} = require("../controllers/income.controller");
const router = express.Router();

router.post("/", getAllIncome);
router.route("/:id")
    .get(getIncome)
    .post(addIncome)
    .patch(updateIncome)
    .delete(deleteIncome);

module.exports = router;
