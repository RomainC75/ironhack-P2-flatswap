const { Schema, model, SchemaTypes } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const messageSchema = new Schema(
  {
    userId: { type: SchemaTypes.ObjectId, ref: "User"},
    target: { type: SchemaTypes.ObjectId, refPath: 'targetModel'},
    comment: String,
    rating: Number,
    targetModel:{
      type: String,
      required: true,
      enum: ['House','User']
    }
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
