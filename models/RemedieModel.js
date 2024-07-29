// models/soil.js
import mongoose from "mongoose";

const remedieSchema = new mongoose.Schema({
    title: { type: String, required:false },
    description: { type: String, required: false},
    image: { type: String, required:false },
    date: { type: Date, default: Date.now }
});

// const Soil = mongoose.model('Soil', soilSchema);
export const Remedie = mongoose.model('Remedie',remedieSchema);

