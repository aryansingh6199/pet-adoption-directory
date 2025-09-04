const express=require("express");
const router=express.Router();
const pet=require("../models/pet");

// GET all pets
router.get("/", async (req, res, next) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    next(err); // send error to middleware
  }
});

// POST new pet
router.post("/", async (req, res, next) => {
  try {
    const { name, category, gender, age, breed } = req.body;
    // Input validation (basic)
    if (!name || !category || !gender || !age || !breed) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPet = new Pet({ name, category, gender, age, breed });
    const savedPet = await newPet.save();

    res.status(201).json(savedPet);
  } catch (err) {
    next(err);
  }
});
module.exports=router;