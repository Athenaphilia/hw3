// routing.js, handles all the complicated routing
const express = require('express');
const path = require('path');
const scan_folder = require('../scanner/scanner');
const file_checker = require('../validation/validation');
const { get_document, get_documents } = require('../db/db');
const router = express.Router();

// location "/" renders home
router.get("/", (req, res) => {
    res.render('home');
});

// gets the pdfList and serves that into the view
router.get("/pdfList", (req, res) => {
    const file_list = scan_folder();
    let data_list = [];
    file_list.forEach(element => {
        const data = get_document(element);
        data_list.push(data);
    });
    res.render('pdfList', { list: data_list });
});

// sends the file if it exists, else 404
router.get("/documents/:pdfName", (req, res) => {
    const pdfName = req.params.pdfName;
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