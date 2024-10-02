import mongoose from "mongoose";

const { Schema, model } = mongoose;

const chatLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  messages: [
    {
      type: { type: String, enum: ["user", "bot"], required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    }
  ]
},
{ timestamps: true });

export default model("ChatLog", chatLogSchema);
