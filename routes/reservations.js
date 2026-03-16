const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservations');
const authHandler = require('../utils/authHandler.js.js');

// Middleware: require authentication for all reservation routes
router.use(authHandler.checkLogin);

// GET all reservations for the current user
router.get('/', reservationController.getAllReservations);

// GET a single reservation by id for the current user
router.get('/:id', reservationController.getReservationById);

// POST reserveACart
router.post('/reserveACart', reservationController.reserveACart);

// POST reserveItems
router.post('/reserveItems', reservationController.reserveItems);

// POST cancelReserve/:id
router.post('/cancelReserve/:id', reservationController.cancelReserve);

module.exports = router;
