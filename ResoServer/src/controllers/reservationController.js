const reservationService = require('../services/reservationService');
const { validateReservation } = require('../utils/validation');

class ReservationController {
  // GET /api/reservations
  getAllReservations(req, res) {
    try {
      const reservations = reservationService.getAllReservations();
      res.json({
        success: true,
        count: reservations.length,
        data: reservations
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve reservations'
      });
    }
  }

  // GET /api/reservations/:id
  getReservationById(req, res) {
    try {
      const { id } = req.params;
      const reservation = reservationService.getReservationById(parseInt(id));
      
      if (!reservation) {
        return res.status(404).json({
          success: false,
          error: 'Reservation not found'
        });
      }

      res.json({
        success: true,
        data: reservation
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve reservation'
      });
    }
  }

  // POST /api/reservations
  createReservation(req, res) {
    try {
      const validationError = validateReservation(req.body);
      if (validationError) {
        return res.status(400).json({
          success: false,
          error: validationError
        });
      }

      const newReservation = reservationService.createReservation(req.body);
      res.status(201).json({
        success: true,
        message: 'Reservation created successfully',
        data: newReservation
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to create reservation'
      });
    }
  }

  // PUT /api/reservations/:id
  updateReservation(req, res) {
    try {
      const { id } = req.params;
      const validationError = validateReservation(req.body, true);
      
      if (validationError) {
        return res.status(400).json({
          success: false,
          error: validationError
        });
      }

      const updatedReservation = reservationService.updateReservation(parseInt(id), req.body);
      
      if (!updatedReservation) {
        return res.status(404).json({
          success: false,
          error: 'Reservation not found'
        });
      }

      res.json({
        success: true,
        message: 'Reservation updated successfully',
        data: updatedReservation
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to update reservation'
      });
    }
  }

  // DELETE /api/reservations/:id
  deleteReservation(req, res) {
    try {
      const { id } = req.params;
      const deleted = reservationService.deleteReservation(parseInt(id));
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Reservation not found'
        });
      }

      res.json({
        success: true,
        message: 'Reservation deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to delete reservation'
      });
    }
  }
}

module.exports = new ReservationController();