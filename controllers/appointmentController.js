const Appointment = require('../models/appointmentModel');

// Create a new appointment
const createAppointment = async (req, res) => {
    const { customerName, email, phone, appointmentDate, timeSlot } = req.body;

    try {
        // Check if the slot is already taken
        const existingAppointment = await Appointment.findOne({
            appointmentDate,
            timeSlot
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'This time slot is already booked.' });
        }

        const newAppointment = new Appointment({
            customerName,
            email,
            phone,
            appointmentDate,
            timeSlot
        });
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single appointment by ID
const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update appointment status (confirm, cancel, etc.)
const updateAppointmentStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        appointment.status = status || appointment.status;
        const updatedAppointment = await appointment.save();
        res.json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        await appointment.remove();
        res.json({ message: 'Appointment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get available time slots for a specific date
const getAvailableSlots = async (req, res) => {
    const { appointmentDate } = req.query;

    try {
        // Find all booked appointments for the given date
        const bookedAppointments = await Appointment.find({ appointmentDate });

        // List of all possible slots
        const allSlots = [
            '10:00 AM - 10:30 AM',
            '10:30 AM - 11:00 AM',
            '11:00 AM - 11:30 AM',
            '11:30 AM - 12:00 PM',
            '12:00 PM - 12:30 PM',
            '12:30 PM - 1:00 PM',
            '1:00 PM - 1:30 PM',
            '1:30 PM - 2:00 PM',
            '2:00 PM - 2:30 PM',
            '2:30 PM - 3:00 PM',
            '3:00 PM - 3:30 PM',
            '3:30 PM - 4:00 PM',
            '4:00 PM - 4:30 PM',
            '4:30 PM - 5:00 PM'
        ];

        // Get the booked time slots from the appointments
        const bookedSlots = bookedAppointments.map(appointment => appointment.timeSlot);

        // Filter out booked slots to get available ones
        const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

        // Send available slots as response
        res.json(availableSlots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointmentStatus,
    deleteAppointment,
    getAvailableSlots,
};
