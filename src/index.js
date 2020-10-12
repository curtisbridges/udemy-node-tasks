const express = require('express')
require('./db/mongoose') // ensures mongoose connects, nothing else
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

const multer = require('multer')
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please upload a Word document'))
    }

    cb(undefined, true)
  }
})
app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
})
app.use(express.json())

// REST API here
app.use(userRouter)
app.use(taskRouter)

// and start the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
