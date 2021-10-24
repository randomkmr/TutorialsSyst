const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// Auth routes
router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/users', controller.countUsers);                           // (paduoda skaičių vartotojų - t.y. COUNT users įrašus)

module.exports = router;





