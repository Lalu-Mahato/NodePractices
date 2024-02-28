const router = require('express').Router();

const fs = require('fs');
const XLSX = require('xlsx');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { HEADERS } = require('../constants/constants');

const { promisify } = require('util');


const writeFileAsync = promisify(fs.writeFile);

// Define your HEADERS constant here if not already defined
// const HEADERS = ...

// Middleware to handle file upload
const uploadFile = async (req, res, next) => {
    try {
        const { path } = req.file;

        // Read the uploaded Excel file
        const workbook = XLSX.readFile(path);
        const sheet_name_list = workbook.SheetNames;

        // Convert the first sheet to JSON data
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {
            defval: null,
            raw: false,
            header: HEADERS,
            range: 1,
        });

        // Convert the JSON data to a formatted string
        const jsonString = JSON.stringify(data, null, 2);

        // Specify the file path where you want to save the JSON data
        const filePath = 'data.json';

        // Write the JSON data to the file using async/await
        await writeFileAsync(filePath, jsonString);

        console.log('JSON data written to file successfully.');
        return res.send();
    } catch (err) {
        console.error('Error writing JSON data to file:', err);
        return res.status(500).send('Error writing JSON data to file.');
    }
};

// Usage in your route
router.post('/upload', upload.single('file'), uploadFile);
module.exports = router;
