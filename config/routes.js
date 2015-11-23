var express = require('express'),
    router  = new express.Router();

// Require controllers.
var welcomeController = require('../controllers/welcome');
var usersController   = require('../controllers/users');

// root path:
router.get('/', welcomeController.index);

// users resource paths:
router.get('/users', usersController.index); // to show a list of users
router.get('/users/:id', usersController.show); // to show one user
router.post('/userid/spot', usersController.create); // create a new spot
router.put('/userid/spot/:id', usersController.edit); // to edit a spot
router.get('/userid/spots', usersController.index); // to show all of a user's spots
router.destroy('/userid/spot/:id', usersController.destroy); // to delete a spot

// spots resource paths:
router.get('/spots', spotsController.show); // to show spots search results
router.get('/spots/:id', spotsController.show); // to show one spot

module.exports = router;
