const { Schema, model, SchemaTypes } = require("mongoose");
const House = require('./House.model')
// TODO: Please make sure you edit the user model to whatever makes sense in this case
const swapSchema = new Schema(
  {
    house1: { type: SchemaTypes.ObjectId, ref:House, required:true},
    house2: { type: SchemaTypes.ObjectId, ref:House, required:true},
    swapStart: Date,
    durationDays: Number,
    validation: { type: Boolean, default:false },
    messagesPossible: { type:Boolean, default:false } 
  },
  {
    timestamps: true,
  }
);

const Swap = model("Swap", swapSchema);
module.exports = Swap;