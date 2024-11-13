// Import necessary modules
const Web3 = require('web3'); 
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

// Enable CORS to allow requests from frontend
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IPFS client setup (connect to your IPFS node, add URL to .env for security)
const ipfs = create({ url: process.env.IPFS_API_URL });

// Set up routes for file uploads and identity verification
app.use('/api/upload', fileUploadRoutes);
app.use('/api/identity', identityRoutes);


// File upload handling using multer
const upload = multer({ storage: multer.memoryStorage() });

// File upload route for handling file upload to IPFS
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Ensure a file was uploaded
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Add file to IPFS
    const added = await ipfs.add(req.file.buffer);

    // Respond with IPFS hash of the uploaded file
    res.json({ ipfsHash: added.path });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).send('Error uploading file to IPFS');
  }
});

// Example identity verification route (can be expanded)
app.post('/verify-identity', (req, res) => {
  const { aadharNumber, name, dateOfBirth } = req.body;

  // Implement logic to verify identity, such as checking database or IPFS
  if (aadharNumber && name && dateOfBirth) {
    // Dummy verification
    res.status(200).json({ message: 'Identity verified successfully!' });
  } else {
    res.status(400).json({ message: 'Identity verification failed.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
