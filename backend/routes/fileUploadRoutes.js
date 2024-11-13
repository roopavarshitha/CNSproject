const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // Store uploaded files in 'uploads' folder
const { uploadAadhaar } = require('../controllers/fileUploadController');

const router = express.Router();

router.post('/upload-aadhaar', upload.single('aadhaarCard'), uploadAadhaar);

module.exports = router;
