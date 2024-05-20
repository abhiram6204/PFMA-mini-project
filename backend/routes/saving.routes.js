const express = require("express");

const {
  getSaving,
  getAllSavings,
  addSaving,
  updateSaving,
  deleteSaving
} = require("../controllers/saving.controller");
const router = express.Router();

router.post("/", getAllSavings);
router.route("/:id")
    .get(getSaving)
    .post(addSaving)
    .patch(updateSaving)
    .delete(deleteSaving);

module.exports = router;
