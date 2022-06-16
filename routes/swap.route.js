const Swap = require("../models/Swap.model")
const authentification = require("../middleware/authentication.mid")
const router = require("express").Router()

//get a swap between 2 houses
//verify H1 is owned by the user
router.get("/", (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        const swapsByUser = await Swap.find({house1: {$in: user.ownedHouses}})
        //   if(user.ownedHouses.includes(req.user._id.)){
        //   res.status(201).json(ans)
        // }else{
        //   res.status(400).json({message:"unauthorized!"})
        // }
        
      } catch (err) {
        next(err)
      }
    })

//create a new swap
router.post("/", authentification, async (req, res, next) => {
  try {
    const createSwap = await Swap.create(req.body)
    res.status(201).json(createSwap)
  } catch (err) {
    next(err)
  }
})

//erase and create a new swap
router.post("/:id", (req, res, next) => {})

//update a swap
router.put("/:id", async (req, res, next) => {
  try {
    const updateWithId = req.params.id
    const oneSwap = await Swap.findById(req.params.id).populate("house")
    res.status(201).json(oneSwap)
  } catch (err) {
      next(err)
  }
})

//delete
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteSwap = await Swap.findByIdAndRemove(req.params.id)
    res.json({ message: `you deleted ${deleteSwap}` })
  } catch (err) {
    next(err)
  }
})
module.exports = router