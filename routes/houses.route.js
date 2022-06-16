const router = require("express").Router()
const House = require("../models/House.model")
const User = require('../models/User.model')
const { validateHouseNumber } = require("../utils/housePostValidation")
const authentication = require('../middleware/authentication.mid')

//get all houses//
router.get("/",async (req, res, next) => {
  try {
    if(Object.keys(req.query).length===0){
      const houses = await House.find().sort( {"adress.country":1} )
      res.status(200).json(houses)
    }else{
      const houses = await House.find({'adress.country':req.query.country}).sort( {"adress.country":1} )
      res.status(200).json(houses)
    }
  } catch (err) {
    next(err)
  }
})

//Get the house with id//
router.get("/:id", async (req, res, next) => {
  try {
    const ans = await House.findById(req.params.id)
    res.status(200).json(ans)
  } catch (err) {
    next(err)
  }
})

//user can post a house 
router.post("/", authentication, async (req, res, next) => {
  try {
    const isValidated = validateHouseNumber(req.body, res)
    if (isValidated) {
      const createdHouse = await House.create(req.body)
      const ans = await User.findByIdAndUpdate(req.user._id,{ $push:{ ownedHouses:createdHouse._id } })
      res.status(201).json(createdHouse)
    }
  } catch (err) {
    next(err)
  }
})

//user can update details for one of his houses
router.put("/:id", authentication, async (req, res, next) => {
  try {
    const houseId = req.params.id
    const actualUser = await User.findById(req.user._id)
    if( req.user.accessLevel === 'admin' || actualUser.ownedHouses.includes(req.params.id) ){
      const findHouse = await House.findByIdAndUpdate(houseId, req.body, {
        new: true,
      })
      res.status(200).json(findHouse)
    }else{
      res.status(400).json({message:"unauthorized !"})
    }
    
  } catch (error) {
    next(error)
  }
})

//user can delete a house from his profile//
router.delete("/:id", authentication, async (req, res, next) => {
  try {
    const actualUser = await User.findById(req.user._id)
    //req.user._id.toString() === message.senderId.toString()
    if(req.user.accessLevel === 'admin' || actualUser.ownedHouses.includes(req.params.id)){
      const ans = await House.findByIdAndDelete( req.params.id )
      const modifiedUser = await User.findByIdAndUpdate( req.user._id , { $pull: {ownedHouses:req.params.id} } , {new:true} )
      res.status(201).json(ans)
    }else{
      res.status(400).json({message:"unauthorized!"})
    }
    
  } catch (err) {
    next(err)
  }
})

module.exports = router
