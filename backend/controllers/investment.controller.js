const investmentModel  = require("../models/investment.model");
const userModel = require("../models/user.model");
const user=require("../models/user.model")
// Controller to get a single saving by ID
const getSaving = async (req, res) => {
  try {
    const saving = await investmentModel.findById(req.params.id);
    if (!saving) {
      return res.status(404).json({ success: false, error: "Saving not found" });
    }
    res.status(200).json({ success: true, data: saving });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to get all savings
const getAllSavings = async (req, res) => {
  try {
    const savings = await investmentModel.find();
    res.status(200).json(savings);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Controller to update a saving
const updateSaving = async (req, res) => {
  try {
    const { userID, investmentName, amountInvested, currentValue, startDate, description } = req.body;
    const saving = await investmentModel.findByIdAndUpdate(req.params.id, { userID, investmentName, amountInvested, currentValue, startDate, description }, { new: true });
    if (!saving) {
      return res.status(404).json({ success: false, error: "Saving not found" });
    }
    res.status(200).json({ success: true, data: saving });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to delete a saving
const deleteSaving = async (req, res) => {
  try {
    const saving = await investmentModel.findByIdAndDelete(req.params.id);
    if (!saving) {
      return res.status(404).json({ success: false, error: "Saving not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const addSaving = async (req, res) => {
  const currentUser = await userModel.findById(req.user._id);
  const { investmentName, amountInvested, currentValue, startDate, description } = req.body;
  try {
      if (!investmentName || !amountInvested || !startDate) {
          return res.status(400).json({ success: false, error: "Please provide investment name, amount invested, and start date" });
      }

      const saving = await investmentModel.create({
          userID: req.user._id,
          investmentName,
          amountInvested,
          currentValue,
          startDate,
          description
      });

      res.status(201).json({ success: true, data: saving });
  } catch (error) {
      res.status(401).json({ success: false, data: error.message });
  }
};

module.exports={getSaving,getAllSavings,addSaving,updateSaving,deleteSaving};

