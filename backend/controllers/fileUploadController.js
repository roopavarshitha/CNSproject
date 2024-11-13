const { uploadToIPFS } = require('../services/ipfsService');

const uploadAadhaar = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const ipfsHash = await uploadToIPFS(file.path);
    res.status(200).json({ message: 'File uploaded successfully', ipfsHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading file' });
  }
};

module.exports = { uploadAadhaar };
