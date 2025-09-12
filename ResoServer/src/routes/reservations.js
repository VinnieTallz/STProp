const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// GET /api/reservations - Get all reservations
router.get('/reservations', reservationController.getAllReservations);

// GET /api/reservations/:id - Get a specific reservation
router.get('/reservations/:id', reservationController.getReservationById);

// POST /api/reservations - Create a new reservation
router.post('/reservations', reservationController.createReservation);

// PUT /api/reservations/:id - Update a reservation
router.put('/reservations/:id', reservationController.updateReservation);

// DELETE /api/reservations/:id - Delete a reservation
router.delete('/reservations/:id', reservationController.deleteReservation);

module.exports = router;