const router = require("express").Router()
const House = require("../models/House.model")
const { validateHouseNumber } = require("../utils/validation")

//get all houses//
router.get("/", async (req, res, next) => {
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
router.post("/", async (req, res, next) => {
  try {
    console.log("--> post", req.body)
    const validateHouseNumber = validateHouseNumber(req.body, res)
    if (valideHouseNumber) {
      res.send("ok, going to create a house !")
      const ans = await House.create(req.body)
      res.status(201).json(ans)
    }
  } catch (err) {
    next(err)
  }
})

//user can delete a house from his profile//
router.delete("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id)
    const ans = await House.findByIdAndDelete(req.params.id)
    res.status(201).json(ans)
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

module.exports = router
