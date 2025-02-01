const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config(); // Load environment variables

// Initialize the app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup using connection pooling
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '111999',
    database: process.env.DB_NAME || 'job',
});

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Registration Endpoint
const { body, validationResult } = require('express-validator');

// Registration Endpoint with Validation
app.post('/register', 
    [
        body('first_name').notEmpty().withMessage('First name is required'),
        body('last_name').notEmpty().withMessage('Last name is required'),
        body('phonenumber').isMobilePhone().withMessage('Invalid phone number'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { first_name, last_name, phonenumber, password } = req.body;

        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.query('SELECT * FROM users WHERE phonenumber = ?', [phonenumber]);
            if (rows.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await connection.query('INSERT INTO users (first_name, last_name, phonenumber, password) VALUES (?, ?, ?, ?)', 
                [first_name, last_name, phonenumber, hashedPassword]);

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Failed to register user' });
        } finally {
            if (connection) connection.release();
        }
    }
);

// Login Endpoint
app.post('/login', async (req, res) => {
    const { phonenumber, password } = req.body;

    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM users WHERE phonenumber = ?', [phonenumber]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Return the user data, excluding the password
        const { password: _, ...userData } = user;
        res.json({ user: userData });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An unexpected error occurred', error: error.message });
    } finally {
        if (connection) connection.release();
    }
});

// Apply Endpoint
app.post('/apply', upload.fields([{ name: 'resume' }, { name: 'profileImage' }]), async (req, res) => {
    let connection;
    try {
        const { 
            firstName, 
            lastName, 
            gender, 
            dateOfBirth, 
            nationality, 
            phone, 
            email, 
            educationLevel, 
            livingStatus, 
            location, 
            address, 
            projectTitle, 
            projectDescription, 
            workTitle, 
            experienceYears 
        } = req.body;

        console.log('Incoming data:', req.body);

        const resumeFile = req.files['resume'] ? req.files['resume'][0] : null;
        const imageFile = req.files['profileImage'] ? req.files['profileImage'][0] : null;

        // Validate required fields
        if (!firstName || !lastName || !gender || !email || !resumeFile) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        const resumePath = resumeFile.path;  // Store this path in the database
        const imagePath = imageFile ? imageFile.path : null;  // Store this path as well

        console.log('Resume path:', resumePath);
        console.log('Image path:', imagePath);

        connection = await pool.getConnection();

        // Prepare the SQL query with logging
        const sql = `
            INSERT INTO resumes 
                (first_name, last_name, email, address, education_level, project_title, project_description, work_title, date_of_birth, nationality, location, living_status, gender, resume_file_path, image_file_path, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

        console.log('SQL Query:', sql);
        console.log('Values:', [
            firstName, lastName, email, address, educationLevel,
            projectTitle, projectDescription, workTitle, dateOfBirth,
            nationality, location, livingStatus, gender, resumePath, imagePath
        ]);

        await connection.query(sql, [
            firstName, lastName, email, address, educationLevel,
            projectTitle, projectDescription, workTitle, dateOfBirth,
            nationality, location, livingStatus, gender, resumePath, imagePath
        ]);

        res.json({ message: 'Application submitted successfully!' });
    } catch (error) {
        console.error('Error during application submission:', error.message);
        console.error('SQL Error:', error.sqlMessage);
        res.status(500).json({ message: 'Failed to submit application' });
    } finally {
        if (connection) connection.release();
    }
});

//Display Info of user in profile
app.get('/api/users', async (req, res) => {
    let connection;  // Declare connection here
    try {
        connection = await pool.getConnection();
        const [results] = await connection.query('SELECT * FROM users');
        res.json(results);
    } catch (error) {
        console.error('Error fetching users:', error);  // Log the error
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) connection.release();
    }
});
// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});