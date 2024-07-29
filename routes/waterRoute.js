
import express from 'express'
import { Water } from '../models/waterModel.js';
const router = express.Router();

router.post("/", async (request, response) => {
  try {
  
 
    const newWater = {
      source: request.body.source,
      amount: request.body.amount,
      frequency: request.body.frequency,
      waterpH: request.body.waterpH,
      cost: request.body.cost,
      slope: request.body.slope,
      date: request.body.date,
    };
    const water = await Water.create(newWater);
    return response.status(201).send(water)
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
    const water = await Water.find({});
    return response.status(200).json({
      count: water.length,
      data: water,
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
    const water = await Water.findById(id);
    return response.status(200).json(water);
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
    const result = await Water.findByIdAndUpdate(id, request.body);
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
    const result = await Water.findByIdAndDelete(id);
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