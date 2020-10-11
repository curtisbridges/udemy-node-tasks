const express = require('express')
const task = require('../models/task')

const router = new express.Router()

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    await task.save()
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const task = Task.findById(_id)
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    // remove atomic operation to enable user middleware
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    const task = await Task.findById(req.params.id)

    if (!task) {
      return req.status(404).send()
    }

    updates.forEach((update) => {
      user[update] = req.body[update]
    })

    await task.save()
    res.send(task)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/tasks/:id', async (req, res) => {
  try {
    const id = await Task.findByIdAndDelete(req.params.id)
    if (!id) {
      return res.status(404).send()
    }
    res.send()
  } catch (error) {
    res.status(400).send()
  }
})

module.exports = router
