const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const isAuthenticated = require('../../middleware/authenticator');
const isAuthenticated2 = require('../../middleware/authenticator');

// Tutorials routes
router.get('/user-tutorials/:id', isAuthenticated, controller.userTutorials);                                //(tik prisijungusiems - paduoda visus tutorialus, kurie priklauso specifiniam vartotojui pagal jo ID)
router.get('/tutorials', isAuthenticated2, controller.viewTutorials);                                        //(paduoda visus tutorialus, jei vartotojas auth - paduoda visus; jei neprisijungęs, tik tuos, kur private = 0)
router.post('/tutorials', isAuthenticated, controller.createTutorial);                                       //(tik prisijungusiems vartotojams, sukuria naują įrašą - user_id paima iš token)

module.exports = router;
