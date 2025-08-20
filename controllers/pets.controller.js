const createHttpError = require('http-errors');
const Pet = require('../models/Pet');

// Create
exports.createPet = async (req, res, next) => {
  try {
    const pet = await Pet.create(req.body);
    return res.status(201).json(pet);
  } catch (err) {
    return next(err);
  }
};

// Read all
exports.getPets = async (_req, res, next) => {
  try {
    const pets = await Pet.find().sort({ createdAt: -1 });
    return res.json(pets);
  } catch (err) {
    return next(err);
  }
};

// Read one
exports.getPet = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return next(createHttpError(404, 'Pet not found'));
    return res.json(pet);
  } catch (err) {
    return next(err);
  }
};

// Update
exports.updatePet = async (req, res, next) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pet) return next(createHttpError(404, 'Pet not found'));
    return res.json(pet);
  } catch (err) {
    return next(err);
  }
};

// Delete
exports.deletePet = async (req, res, next) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return next(createHttpError(404, 'Pet not found'));
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};
