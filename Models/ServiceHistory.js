import mongoose from "mongoose";

const {Schema, model} = mongoose;

const serviceHistorySchema = new Schema({
    carId: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    serviceDate: { type: Date, required: true },
    mileage: { type: Number, required: true },
    serviceType: { type: String, required: true },
    garage: { type: String, required: false },
    cost: { type: Number, required: false },
    notes: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

export default model("ServiceHistory", serviceHistorySchema);