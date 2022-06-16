const router = require("express").Router()
const House = require("../models/House.model")
const User = require('../models/User.model')
const { validateHouseNumber } = require("../utils/housePostValidation")
const authentication = require('../middleware/authentication.mid')

//get all houses//
router.get("/", authentication,async (req, res, next) => {
  try {
    const houses = await House.find()
    res.status(200).json(houses)
  } catch (err) {
    next(err)
  }
})

//Get the house with id//
router.get("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id)
    const ans = await House.findById(req.params.id)
    res.status(200).json(ans)
  } catch (err) {
    next(err)
  }
})

//user can post a house //
router.post("/", authentication, async (req, res, next) => {
  try {
    console.log("--> post", req.body)
    const isValidated = validateHouseNumber(req.body, res)
    if (isValidated) {
      const createdHouse = await House.create(req.body)
      res.status(201).json(createdHouse)
    }
  } catch (err) {
    next(err)
  }
})

//user can update details for one of his houses//
router.patch("/:id", async (req, res, next) => {
  console.log(req.body)
  try {
    const houseId = req.params.id
    console.log(houseId)
    const findHouse = await House.findByIdAndUpdate(houseId, req.body, {
      new: true,
    })
    res.status(200).json(findHouse)
  } catch (error) {
    next(error)
  }
})

//user can delete a house from his profile//
router.delete("/:id", authentication, async (req, res, next) => {
  try {
    console.log(req.params.id)
    const actualUser = await User.findById(req.user._id)
    //req.user._id.toString() === message.senderId.toString()
    console.log('-->',actualUser)
    if(req.user.accessLevel === 'admin' || actualUser.ownedHouses.includes(req.user._id.toString())){
      //const ans = await House.findByIdAndDelete(req.params.id)
      res.status(201).json(ans)
    }else{
      res.status(400).json({message:"unauthorized!"})
    }
    
  } catch (err) {
    next(err)
  }
})

module.exports = router
