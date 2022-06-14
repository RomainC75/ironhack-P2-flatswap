const { Schema, model, SchemaTypes } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const messageSchema = new Schema(
  {
    senderId: { type: SchemaTypes.ObjectId, ref: "User"},
    receiverId: { type: SchemaTypes.ObjectId, ref: "User"},
    content: String
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
