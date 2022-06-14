const router = require("express").Router()
const House = require("../models/House.model")

//get all houses//
router.get("/", async (req, res, next) => {
  try {
    const houses = await House.find()
    res.status(200).json(houses)
  } catch (err) {
    next(404)
  }
})

//Get the house with id//
router.get("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id)
    const ans = await House.findById(req.params.id).populate("id")
    res.status(200).json(ans)
  } catch (err) {
    next(404)
  }
})

//user can post a house //
router.post("/", async (req, res, next) => {
  try {
    console.log('--> post', req.body)
    const ans = await House.create(req.body)
    res.status(201).json(ans)
  } catch (err) {
    next(404)
  }
})

//user can delete a house from his profile//
router.delete("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id)
    const ans = await Movie.findByIdAndDelete(req.params.id)
    res.status(201).json(ans)
  } catch (err) {
    next(404)
  }
})

//user can update details for one of his houses//
router.post("/houses/:id", async (req, res, next) => {
  try {
    const houseId = req.params.id
    const findHouse = await House.findByIdAndUpdate(houseId, req.body, {
      new: true,
    })
    res.status(200).res.json(findHouse)
  } catch (error) {
    next(error)
  }
})

module.exports = router
