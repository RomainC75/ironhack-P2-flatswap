const Swap = require("../models/Swap.model")
const authentication = require("../middleware/authentication.mid")
const House = require("../models/House.model")
const router = require("express").Router()
const User = require('../models/User.model')
//get a swap between 2 houses
//verify H1 is owned by the user
router.get("/", authentication, async(req, res, next) => {
    try {
        
        const user = await User.findById(req.user._id)
        const swapFound = await Swap.find({
            $or:[
                {$and:[ {$house1:req.body.house1},{$house2:req.body.house2} ]},
                {$and:[ {$house1:req.body.house2},{$house2:req.body.house1} ]}
            ]
        }).populate('house1').populate('house2')

        res.status(200).json(swapFound)

      } catch (err) {
        next(err)
      }
    })

//create a new swap
router.post("/", authentication, async (req, res, next) => {
  try {
    if(!req.body.house1){
        res.status(400).json({message:"missing house1!"})
        return
    }else if(!req.body.house2){
        res.status(400).json({message:"missing house2"})
        return
    }
    const foundHouse1 = await House.findById(req.body.house1)
    const foundHouse2 = await House.findById(req.body.house2)
    if(foundHouse1===null){
        res.status(400).json({message:"house1 not found!"})
        return
    }else if(foundHouse2===null){
        res.status(400).json({message:"house2 not found!"})
        return
    }
    const createSwap = await Swap.create(req.body)
    res.status(201).json(createSwap)
  } catch (err) {
    next(err)
  }
})



//update a swap
router.put("/:id", authentication, async (req, res, next) => {
  try {
    const updateWithId = req.params.id
    const currentSwap = await Swap.findById(req.body._id)
    const oneSwap = await Swap.findByIdAndUpdate(req.body._id,{
        
    })

    const foundUser = await User.findById(req.user._id)
    const foundSwap = await Swap.findById(req.params.id)
    console.log(foundUser)
    if(foundSwap===null){
        res.status(400).json({message:"swap not found!"})
    }
    if( foundUser.ownedHouses.includes(foundSwap.house1) ){
        const updatedSwap = await Swap.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(updatedSwap)
    }else if(foundUser.ownedHouses.includes(foundSwap.house2)){
        const updatedSwap = await Swap.findByIdAndUpdate(req.params.id,{
            ...req.body,
            house1:foundSwap.house2,
            house2:foundSwap.house1
        },{new:true})
        res.status(200).json(updatedSwap)
    }else{
        res.status(400).json({message:"unauthorized ! the user has to own one of the 2 houses"})
    }

    
  } catch (err) {
      next(err)
  }
})

//delete
router.delete("/:id", authentication , async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.user._id)
    const foundSwap = await Swap.findById(req.params.id)
    if(foundSwap===null){
        res.status(400).json({message:"swap not found!"})
    }
    if( foundUser.ownedHouses.includes(foundSwap.house1) || foundUser.ownedHouses.includes(foundSwap.house2) ){
        const deleteSwap = await Swap.findByIdAndRemove(req.params.id)
        res.status(200).json({ message: "the swap is deleted" })
    }else{
        res.status(400).json({message:"unauthorized ! the user has to own one of the 2 houses"})
    }
  } catch (err) {
    next(err)
  }
})
module.exports = router