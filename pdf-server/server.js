const express = require('express')
const path = require('path');
const routing = require("./routing/routing")
const { request_logger, detailed_logger } = require('./logging/logging');
const { add_document } = require('./db/db');
const app = express()


const PORT = 3000
app.use(request_logger);
app.use("/", routing);

let filepath = path.join(__dirname, "documents", "Test1.pdf");
add_document("Test1.pdf", filepath, "Tester 1", "Contains test text, very short.");
filepath = path.join(__dirname, "documents", "Test2.pdf");
add_document("Test2.pdf", filepath, "Tester 2", "Contains test text, full sentence.");
filepath = path.join(__dirname, "documents", "Test3.pdf");
add_document("Test3.pdf", filepath, "Tester 3", "Contains image.");

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// to avoid error 137 on docker shutdown
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server closed. Exiting.');
        process.exit(0);
    })
})