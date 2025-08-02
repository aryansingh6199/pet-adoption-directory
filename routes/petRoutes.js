const express = require('express');
const router = express.Router();
const { addPet } = require('../controllers/petControllers'); // add the "s"


// POST /api/pets - Add new pet
router.post('/add', addPet);

module.exports = router;
