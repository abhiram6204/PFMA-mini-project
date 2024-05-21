const express = require("express");

const {
  getSaving,
  getAllSavings,
  addSaving,
  updateSaving,
  deleteSaving
} = require("../controllers/investment.controller");
const router = express.Router();

router.get("/", getAllSavings);
router.post("/",addSaving)
router.route("/:id")
    .get(getSaving)
    // .post(addSaving)
    .patch(updateSaving)
    .delete(deleteSaving);

module.exports = router;
