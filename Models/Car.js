import mongoose from "mongoose";

const { Schema, model } = mongoose;

const carSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    vin: { type: String, required: false },
    fuel: { type: String, required: false },
    serviceHistoryId: [{ type: Schema.Types.ObjectId, ref: "ServiceHistory" }],
    createdAt: { type: Date, default: Date.now },
});

export default model("Car", carSchema);
