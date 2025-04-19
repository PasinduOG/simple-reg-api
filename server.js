// Import required modules
const express = require('express');
const server = express();
require('dotenv').config(); // Load environment variables from .env file
const PORT = process.env.PORT; // Get port from environment variables

// Middleware to parse JSON request bodies
server.use(express.json());

// Route handler for user registration
server.post('/register', (req, res) => {
    // Extract user information from request body using destructuring
    const { name, email, password, mobile } = req.body;

    // Validate that all required fields are provided
    // Return 400 Bad Request if any field is missing
    if (!name || !email || !password || !mobile) {
        return res.status(400).json({ error: 'Please provide name, email and password' });
    }

    // Email validation using Regular Expression
    // This regex enforces Gmail addresses that:
    // - Cannot start with only numbers
    // - Can contain letters, numbers, dots, underscores, percent signs, plus signs, and hyphens
    // - Must end with @gmail.com
    const emailRegex = /^(?!^\d+@gmail\.com$)[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]{0,63})@gmail\.com$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid Gmail address' });
    }

    // Mobile number validation for Sri Lankan numbers
    // Accepts formats like: 0712345678, +94712345678, 712345678
    // First digit after 7 must be 0,1,2,4,5,6,7,8 (based on Sri Lankan carriers)
    const mobileRegex = /^(?:0|(\+94))?7[0,1,2,4,5,6,7,8]{1}[0-9]{7}$/;
    if (!mobileRegex.test(mobile)) {
        return res.status(400).json({ error: 'Please provide a valid Sri Lankan mobile number' });
    }

    // TODO: In production, implement these security measures:
    // 1. Check if email already exists in database
    // 2. Hash the password using bcrypt
    // 3. Store user in database

    // Log registration for debugging purposes
    console.log('New user registered:', { name, email, mobile });

    // Send successful response with 201 Created status
    // Note: We don't include the password in the response for security
    res.status(201).json({
        message: 'Registration successful',
        user: { name, email, mobile }
    });
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});