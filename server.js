const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoint to handle response saving
app.post('/saveResponse', (req, res) => {
    const { response } = req.body;

    if (!response) {
        return res.status(400).json({ error: 'Response is required' });
    }

    // Simulating database save (you can replace this with actual DB logic)
    console.log(`Response saved: ${response}`);

    // Send email with the response
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aaryanm503@gmail.com', // Replace with your email
            pass: '2Ar25An@503', // Replace with your email password
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'aaryanm503@gmail.com', // Replace with your email
        subject: 'New Response Received',
        text: `She said: "${response}"`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Response saved and email sent' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
