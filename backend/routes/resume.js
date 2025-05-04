const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const dotenv = require('dotenv');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Resume Parsing Route
router.post('/parse', upload.single('resume'), async (req, res) => {
    const fileBuffer = req.file.buffer;
    const originalname = req.file.originalname;
    const apiKey = process.env.LLAMAPARSE_API_KEY;

    try {
        const form = new FormData();
        form.append('file', fileBuffer, originalname);

        const response = await axios.post('https://api.cloud.llamaindex.ai/api/parsing/upload', form, {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${apiKey}`
            }
        });

        // Assuming the response contains the text in response.data.text
        const extractedText = response.data;
        console.log(response);
        res.status(200).json({ parsedData: response.data, extractedText });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error parsing resume' });
    }
});

module.exports = router;
