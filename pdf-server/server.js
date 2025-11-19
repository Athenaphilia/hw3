const express = require('express')
const app = express()

const PORT = 8086

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})