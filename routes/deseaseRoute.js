
import express from 'express'
import { Deasease  } from '../models/deseaseModel.js';
const router = express.Router();

router.post("/", async (request, response) => {
  try {
 
    const newDesease = {
      type: request.body.type,
      name: request.body.name,
      parts: request.body.parts,
      date: request.body.date,
    };
    const desease = await Deasease.create(newDesease);
    return response.status(201).send(desease)
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      message: error.message,
    });
  }
});

// get all book
router.get("/", async (request, response) => {
  try {
    const deseases = await Deasease.find({});
    return response.status(200).json({
      count: deseases.length,
      data: deseases,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      message: error.message,
    });
  }
});
// get book details by id

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const desease = await Deasease .findById(id);
    return response.status(200).json(desease);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      message: error.message,
    });
  }
});
//    update  book

router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Deasease .findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({
        message: "Book not found",
      });
    }
    return response.status(200).send({
      message: "book updated",
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// delete book

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Deasease.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).send({ message: "book deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router