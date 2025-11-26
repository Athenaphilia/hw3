const express = require('express');
const path = require('path');
const scan_folder = require('../scanner/scanner');
const file_checker = require('../validation/validation');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Home page");
});

router.get("/pdfList", (req, res) => {
    res.send(scan_folder());
});

router.get("/documents/:pdfName", (req, res) => {
    const pdfName = req.params.pdfName;
    console.log(file_checker(pdfName))
    if (!file_checker(pdfName)) {
        res.status(404).send("File not found");
    } else {
        const options = {
            root: path.join(__dirname, '..', 'documents'),
        };
        res.sendFile(pdfName, options);
    }
});

module.exports = router;