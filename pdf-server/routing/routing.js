const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Home page");
});

router.get("/pdfList", (req, res) => {
    res.send("Pdf List")
});

router.get("/documents/:pdfName", (req, res) => {
    const pdfName = req.params.pdfName;
    res.sendFile(`../documents/${pdfName}`);
});

module.exports = router;