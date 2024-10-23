const express = require('express');
const connectDB = require('./config/db');
const appointmentRoutes = require('./routes/appointmentRoutes');
require('dotenv').config();

const app = express();
connectDB();
app.use(express.json());

// Routes
app.use('/api', appointmentRoutes);

app.get('/', (req, res) => {
    res.send('Booking system started');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
