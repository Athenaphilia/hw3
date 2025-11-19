const express = require('express')
const app = express()
const routing = require("./routing/routing")
const { requestLogger, detailedLogger } = require('./logging/logging');


const PORT = 3000

app.use(requestLogger);

app.use("/", routing);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// to avoid error 137 on docker shutdown
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server closed. Exiting.');
        process.exit(0);
    })
})