const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// Auth routes
router.post('/login', controller.login);
router.get('/login', controller.loginGet);
router.get('/register', controller.registerGet);
router.post('/register', controller.register);
router.get('/users', controller.countUsers);                           

module.exports = router;





