const asyncHandler = require("express-async-handler");
const Income = require("../models/income.model");
const User = require("../models/user.model");

// Add income of an user
const addIncome = asyncHandler(async (req, res) => {
    const {amount,source,description } = req.body;
    const currentUser=await User.findById(req.user._id)
    if (!currentUser) {
      res.status(400);
      throw new Error(`There is no user with the ID ${req.user._id}`);
    }
    const income = await Income.create({
      userID: req.user._id,
      amount,
      source,
      description
    });
    if (!income) {
      res.status(400);
      throw new Error(" data invalid");
    }
    res
      .status(201)
      .json({ _id: income.ID, incomeName: incomeName.Name, incomeAmount: income.incomeAmount,user: req.user._id });
  });
  
  //Display all sources of income of a user

  const getAllIncome= asyncHandler(async(req,res)=>{
    const currentUser=await User.findById(req.user._id)
    if(!currentUser)
        {
            res.status(400);
            throw new Error(`There is no user with the ID ${req.user._id}`);
        }
        const income=await Income.find({userID:currentUser._id})
        if(!income)
            {
                res.status(400);
                throw new Error(" data invalid");
            }
            res.status(200).json(income);
  })

  //display income from a particular source

  const getIncome= asyncHandler(async(req,res)=>{
    const currentUser=await User.findById(req.user._id)
    if(!currentUser)
        {
            res.status(400);
            throw new Error(`There is no user with the ID ${req.user._id}`);
            }
            const income=await Income.find({incomeID:req.params.id})
            if(!income)
                {
                    res.status(400);
                    throw new Error("data invalid");
                    }
                    res.status(200).json(income);
    })

// update the income
const updateIncome= asyncHandler(async(req,res)=>{
    const currentUser=await User.findById(req.user._id)
    if(!currentUser)
        {
            res.status(400);
            throw new Error(`There is no user with the ID ${req.user._id}`);
            }
            const income=await Income.findById(req.params.id)
            if(!income)
                {
                    res.status(400);
                    throw new Error(" data invalid");
                }
                    income.incomeID=req.body.incomeID
                    income.incomeName=req.body.incomeName
                    income.incomeAmount=req.body.incomeAmount
                    await income.save()
                    res.status(200).json(income);
})

//delete the income
const deleteIncome= asyncHandler(async(req,res)=>{
    const currentUser=await User.findById(req.params.id)
    if(!currentUser)
        {
            res.status(400);
            throw new Error(`There is no user with the ID ${req.user._id}`);
            }
            const income=await Income.findById(req.params.id)
            if(!income)
                {
                    res.status(400);
                    throw new Error(" data invalid");
                }
                await income.remove()
                res.status(200).json(income);
})

module.exports={addIncome,getAllIncome,getIncome,updateIncome,deleteIncome}
