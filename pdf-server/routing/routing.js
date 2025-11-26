const express = require('express')
const path = require("path")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Home page");
});

router.get("/pdfList", (req, res) => {
    res.send("Pdf List")
});

router.get("/documents/:pdfName", (req, res) => {
    const pdfName = req.params.pdfName;
    const options = {
        root: path.join(__dirname, '..', 'documents'), // Define the root directory for relative paths
    };
    res.sendFile(pdfName, options);
});

module.exports = router;