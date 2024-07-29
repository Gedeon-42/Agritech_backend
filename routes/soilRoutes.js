import express from 'express';
import multer from 'multer';
import path from 'path';
import { Soil } from '../models/soilModel.js';

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Create a new soil record with image upload
router.post("/", upload.single('image'), async (req, res) => {
  try {
    const newSoil = {
      type: req.body.type,
      location: req.body.location,
      image: req.file ? '/uploads/' + req.file.filename : '',
      moisture: req.body.moisture,
      nutrients: req.body.nutrients,
      slope: req.body.slope,
      date: req.body.date
    };
    const soil = await Soil.create(newSoil);
    return res.status(201).send(soil);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

// Get all soil records
router.get("/", async (req, res) => {
  try {
    const soils = await Soil.find({});
    return res.status(200).json({
      count: soils.length,
      data: soils,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

// Get soil details by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const soil = await Soil.findById(id);
    return res.status(200).json(soil);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

// Update a soil record
router.put("/:id", upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = {
      ...req.body,
      image: req.file ? '/uploads/' + req.file.filename : req.body.image
    };
    const result = await Soil.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!result) {
      return res.status(404).json({
        message: "Soil record not found",
      });
    }
    return res.status(200).send({
      message: "Soil record updated",
      data: result
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete a soil record
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Soil.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Soil record not found" });
    }
    return res.status(200).send({ message: "Soil record deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
