var express = require('express');
var router = express.Router();

// Import controllers
const homeController = require('../controller/homeController');
const menuController = require('../controller/menuController');
const reservationController = require('../controller/reservationController');

/* GET home page. */
router.get('/', homeController.getHomePage);

/* GET about us page */
router.get('/about', homeController.getAboutPage);

/* GET menu page */
router.get('/menu', menuController.getMenuPage);

/* GET reservations page */
router.get('/reservations', reservationController.getReservationsPage);

/* POST reservation submission */
router.post('/submit-reservation', reservationController.submitReservation);

/* POST lookup reservation by code */
router.post('/lookup-reservation', reservationController.lookupReservation);

/* POST update existing reservation */
router.post('/update-reservation', reservationController.updateReservation);

/* POST cancel existing reservation */
router.post('/cancel-reservation', reservationController.cancelReservation);

module.exports = router;
