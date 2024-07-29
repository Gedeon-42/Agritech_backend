// models/soil.js
import mongoose from "mongoose";

const soilSchema = new mongoose.Schema({
    type: { type: String, required:false },
    location: { type: String, required: false},
    image: { type: String, required:false },
    moisture: { type: String, required: false},
    nutrients: { type: String, required:false },
    slope: { type: String, required:false },
    date: { type: Date, default: Date.now }
});

// const Soil = mongoose.model('Soil', soilSchema);
export const Soil = mongoose.model('Soil',soilSchema);

