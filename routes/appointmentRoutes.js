const express = require('express');
const {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointmentStatus,
    deleteAppointment,
    getAvailableSlots,
} = require('../controllers/appointmentController');
const router = express.Router();

// GET: Fetch available time slots for a specific date (This needs to be first)
router.get('/appointments/available-slots', getAvailableSlots);

// POST: Create a new appointment
router.post('/appointments', createAppointment);

// GET: Get all appointments
router.get('/appointments', getAllAppointments);

// GET: Get a single appointment by ID
router.get('/appointments/:id', getAppointmentById);

// PATCH: Update appointment status
router.patch('/appointments/:id/status', updateAppointmentStatus);

// DELETE: Delete an appointment
router.delete('/appointments/:id', deleteAppointment);

module.exports = router;
