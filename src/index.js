const express = require('express')
require('./db/mongoose') // ensures mongoose connects, nothing else
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// REST API here
app.post('/users', (req, res) => {
  const user = new User(req.body)

  user.save().then(() => {
    res.status(201).send(user)
  }).catch((error) => {
    console.log("Error creating user", error)
    res.status(400).send(error)
  })
})

app.post('/tasks', (req, res) => {
  const task = new Task(req.body)

  task.save().then(() => {
    res.status(201).send(task)
  }).catch((error) => {
    res.status(400).send(error)
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
