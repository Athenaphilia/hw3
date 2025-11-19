const express = require('express')
const app = express()
const routing = require("./routing/routing")

const PORT = 8086

app.use("/", routing);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})