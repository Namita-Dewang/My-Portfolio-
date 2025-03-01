const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from React frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// MySQL Connection with Reconnection Handling
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

function connectDatabase() {
    db.connect((err) => {
        if (err) {
            console.error("Database connection failed:", err.message);
            setTimeout(connectDatabase, 5000); // Retry after 5 seconds
        } else {
            console.log("Connected to MySQL database");
        }
    });
}
connectDatabase();

// Handle MySQL disconnections
db.on('error', (err) => {
    console.error("MySQL Error:", err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log("Reconnecting to MySQL...");
        connectDatabase();
    } else {
        throw err;
    }
});

// API Endpoint for Contact Form
app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const query = "INSERT INTO contact_form (name, email, message) VALUES (?, ?, ?)";

    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database error: " + err.message });
        }
        res.json({ success: true, message: "Form submitted successfully" });
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server on Port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
