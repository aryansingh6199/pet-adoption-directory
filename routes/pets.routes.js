const express = require('express');
const router = express.Router();
const PetController = require('../controllers/pets.controller');
const { petValidators, idParamValidator, runValidation } = require('../middleware/validate');

router.get('/', PetController.getPets);
router.get('/:id', idParamValidator, runValidation, PetController.getPet);
router.post('/', petValidators, runValidation, PetController.createPet);
router.put('/:id', [...idParamValidator, ...petValidators], runValidation, PetController.updatePet);
router.delete('/:id', idParamValidator, runValidation, PetController.deletePet);

module.exports = router;
