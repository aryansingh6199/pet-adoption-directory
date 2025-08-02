const Pet = require('../models/Pet');

// Add new pet
const addPet = async (req, res) => {
  try {
    const { name, breed, age, image, description } = req.body;

    if (!name || !breed || !age) {
      return res.status(400).json({ message: 'Name, breed, and age are required.' });
    }

    const newPet = new Pet({ name, breed, age, image, description });
    const savedPet = await newPet.save();

    res.status(201).json(savedPet);
  } catch (error) {
    console.error('Error adding pet:', error.message);
    res.status(500).json({ message: 'Server error while adding pet' });
  }
};

module.exports = { addPet };
