import mongoose from 'mongoose'
import { User } from '../models/user'

const DashSchema = new mongoose.Schema({
     user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
     },
     // total: {type: Number,
     //      default: 0},
     totalIncome: {
          type: Number,
          default: 0
     },
     totalExpense: {
          type: Number,
          default: 0
     },
     totalSavings: {
          type: Number,
          default: 0
     },
     totalInvestment: {
          type: Number,
          default: 0
     },
     // totalDebt: {
     //      type: Number,
     //      default: 0
     // },
     totalNetWorth: {
          type: Number,
          default: 0
     },
     // totalAssets: {
     //      type: Number,
     //      default: 0
     // },
     // totalLiabilities: {
     //      type: Number,
     //      default: 0
     // },



})
const Dash = mongoose.model('Dash', DashSchema)
module.exports(Dash)