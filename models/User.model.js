const { Schema, model, SchemaTypes } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    password: {type: String, required: true },
    email: {type: String, required: true },
    username: { type: String, required:true },
    firstname: String,
    lastname: String,
    adress: {
      number: Number,
      street: String,
      zipCode: Number,
      country: String
    },
    ownedHouses: [{ type: SchemaTypes.ObjectId, ref: "House"}],
    openToEveryPropositions: {type :  Boolean, default:true},
    accessLevel: { type: String, enum : ["user", "admin"], default: "user" }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;