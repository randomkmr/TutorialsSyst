const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const isAuthenticated = require('../../middleware/authenticator');
const isAuthenticated2 = require('../../middleware/authenticator');
const isAuthenticatedCookie = require('../../middleware/authenticator');

// Tutorials routes
router.get('/user-tutorials/:id', isAuthenticated, controller.userTutorials);
router.get('/', isAuthenticatedCookie, controller.viewTutorials);
router.get('/tutorials', isAuthenticatedCookie, controller.viewTutorials);
router.get('/post-tutorial', isAuthenticatedCookie, controller.createTutorial);
router.post('/post-tutorial', isAuthenticatedCookie, controller.createTutorial);
router.get('/tutorials/:id', isAuthenticated2, controller.viewTutorial);

module.exports = router;
