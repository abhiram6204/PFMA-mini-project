const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  investmentName: {
    type: String,
    required: true
  },
  amountInvested: {
    type: Number,
    required: true,
    default:0
  },
  currentValue: {
    type: Number,
    required: true,
    default:0
  },
  startDate: {
    type: Date,
    required: true,
    
    default:Date.now
  },
  description: {
    type: String,
    default: "",
  }
});

const investmentModel = mongoose.model("Investment", investmentSchema);
module.exports = investmentModel;
