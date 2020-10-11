const express = require('express')
require('./db/mongoose') // ensures mongoose connects, nothing else
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// REST API here
app.use(userRouter)
app.use(taskRouter)

// and start the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
