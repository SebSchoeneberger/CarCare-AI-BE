import mongoose from "mongoose";

const {Schema, model} = mongoose;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    carsId: [{ type: Schema.Types.ObjectId, ref: "Car" }],
    chatLogsId: { type: Schema.Types.ObjectId, ref: "ChatLog" }
});

export default model("User", userSchema);

