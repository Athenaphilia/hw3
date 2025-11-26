const express = require('express')
const app = express()
const routing = require("./routing/routing")
const { request_logger, detailed_logger } = require('./logging/logging');
const { file_checker } = require('./validation/validation');


const PORT = 3000
app.use(request_logger);
app.use(file_checker);
app.use("/", routing);

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