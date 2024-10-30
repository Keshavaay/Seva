// Load environment variables
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON bodies

// PostgreSQL Client Setup
const connectionString = process.env.DATABASE_URL; // Use your Render database connection string
const client = new Client({
    connectionString: connectionString,
});

// Connect to the database
client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Connection error', err.stack));

// API route to handle calculation requests
app.post('/calculate', async (req, res) => {
    const { username, items } = req.body;

    // Save the calculation history in the database
    try {
        const queryText = 'INSERT INTO calculations (username, item_data) VALUES ($1, $2)';
        await client.query(queryText, [username, JSON.stringify(items)]);
        res.status(200).send('Calculation saved successfully');
    } catch (error) {
        console.error('Error saving calculation:', error);
        res.status(500).send('Error saving calculation');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
