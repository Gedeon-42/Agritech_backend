// models/soil.js
import mongoose from "mongoose";

const waterSchema = new mongoose.Schema({
    source: { type: String, required:false },
    amount: { type: String, required: false},
    frequency: { type: String, required:false },
    waterpH: { type: String, required: false},
    cost: { type: String, required:false },
    slope: { type: String, required:false },
    date: { type: Date, default: Date.now }
});

// const Soil = mongoose.model('Soil', soilSchema);
export const Water = mongoose.model('Water',waterSchema);


