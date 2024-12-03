const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to save the response
app.post('/saveResponse', (req, res) => {
    const { response } = req.body;

    if (!response) {
        return res.status(400).json({ error: 'Response is required.' });
    }

    console.log(`Response received: ${response}`);

    // Save the response to a file for persistence
    const data = { response, timestamp: new Date().toISOString() };
    fs.appendFile('responses.json', JSON.stringify(data) + '\n', (err) => {
        if (err) {
            console.error('Failed to save response:', err);
            return res.status(500).json({ error: 'Failed to save response.' });
        }

        console.log('Response saved successfully.');
        res.status(200).json({ message: 'Response saved successfully.' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
