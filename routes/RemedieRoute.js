import express from 'express';
import multer from 'multer';
import path from 'path';
import { Remedie } from '../models/RemedieModel.js';

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
    const newRemedie = {
      title: req.body.title,
      description: req.body.description,
      image: req.file ? '/uploads/' + req.file.filename : '',
      date: req.body.date
    };
    const remedie = await Remedie.create(newRemedie);
    return res.status(201).send(remedie);
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
    const remedie = await Remedie.find({});
    return res.status(200).json({
      count: remedie.length,
      data: remedie,
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
    const remedie = await Remedie.findById(id);
    return res.status(200).json(remedie);
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
    const result = await Remedie.findByIdAndDelete(id);
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
