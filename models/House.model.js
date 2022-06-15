const { model, Schema, schemaTypes, default: mongoose } = require("mongoose")

const houseSchema = new Schema({
  category: { type: String, enum: ["flat", "house", "mansion"] },
  images: [String],
  roomsQty: Number,
  bedroomsQty: Number,
  bathroom: {
    quantity: Number,
    bathtub: Boolean,
    shower: Boolean,
  },
  equipped_kitchen: Boolean,
  garden: Boolean,
  pool: Boolean,
  surface: Number,
  pet_friendly: Boolean,

  presentation: String,
  adress: {
    street_name: String,
    street_number: Number,
    city: String,
    country: String,
  },
  available_period: [[Date, Date]],
  fixed_period: { type: Boolean, default: true },
})

const House = model("Houses", houseSchema)
module.exports = House
