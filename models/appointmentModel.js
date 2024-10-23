const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    timeSlot: {
        type: String,
        enum: [
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
        ],
        required: true
    },
    status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
