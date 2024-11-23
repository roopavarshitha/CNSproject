const { uploadToIPFS } = require('./services/ipfsService');
const multer = require('multer');
const upload = multer(); // Middleware for parsing file uploads

app.post('/upload-aadhaar', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        const fileBuffer = req.file.buffer; // Access the file as a buffer
        const cid = await uploadToIPFS(fileBuffer); // Upload to IPFS
        res.status(200).json({ hash: cid }); // Send back the CID
    } catch (error) {
        console.error('Error uploading file to IPFS:', error.message);
        res.status(500).send('Error uploading file');
    }
});
