const express = require('express')
require('./db/mongoose') // ensures mongoose connects, nothing else
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json())

// REST API here
app.use(userRouter)
app.use(taskRouter)


module.exports = app
