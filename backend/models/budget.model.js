const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    spentAmount: {
        type: Number,
        required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  });
  
  const budgetModel = mongoose.model('Budget', budgetSchema);
  module.exports = {budgetModel};
  