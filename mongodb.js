const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(
  connectionURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to the database!')
    }

    const db = client.db(databaseName)

    db.collection('tasks').findOne({
      _id: new ObjectID('5f80f027c8b5b510fc7af1b0')
    }, (error, task) => {
      if (error) {
        return console.log('Failed to fetch')
      }
      console.log(task)
    })

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
      console.log(tasks)
    })
  }
)
