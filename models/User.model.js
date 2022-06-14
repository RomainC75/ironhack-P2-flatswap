const { Schema, model, SchemaTypes } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: {type: String, required: true },
    email: {type: String, required: true },
    firstname: String,
    lastname: String,
    address: {
      number: Number,
      street: String,
      zipCode: Number,
      country: String
    },
    ownedHouses: [{ type: SchemaTypes.ObjectId, ref: "House"}],
    openToEveryPropositions: {type :  Boolean, required:true}
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
