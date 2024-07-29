import mongoose from "mongoose";
const deseaseSchema = new mongoose.Schema({
    name: { type: String, required:false },
    type: { type: String, required: false},
    parts: { type: String, required:false },
    
    date: { type: Date, default: Date.now }
});


// const Soil = mongoose.model('Soil', soilSchema);
export const Deasease = mongoose.model('Desease',deseaseSchema);