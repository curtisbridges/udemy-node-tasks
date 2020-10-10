const express = require('express')

const app = express()
const port = process.env.PORT || 3000

// REST API here

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
