// Import necessary modules
const express = require('express');
const { create } = require('ipfs-http-client');
const multer = require('multer');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUploadRoutes = require('./routes/fileUploadRoutes');
const identityRoutes = require('./routes/identityRoutes');

// Initialize environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Enable CORS with dynamic origin handling
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:5173', 'https://your-frontend-domain.com'];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

// Parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IPFS client setup (connect to IPFS node using URL from environment variables)
const ipfs = create({ url: process.env.IPFS_API_URL });

// Multer configuration for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// File upload route for handling file upload to IPFS
app.post('upload-aadhaar', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Add file to IPFS
    const added = await ipfs.add(req.file.buffer);
    res.json({ ipfsHash: added.path });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ error: 'Error uploading file to IPFS' });
  }
});

// Identity verification route
app.post('/verify-identity', (req, res) => {
  const { aadharNumber, name, dateOfBirth } = req.body;

  if (aadharNumber && name && dateOfBirth) {
    // Dummy verification logic
    res.status(200).json({ message: 'Identity verified successfully!' });
  } else {
    res.status(400).json({ message: 'Identity verification failed.' });
  }
});

// Use external route handlers for modularity
app.use('/api/upload-aadhaar', fileUploadRoutes);
app.use('/api/identity', identityRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
