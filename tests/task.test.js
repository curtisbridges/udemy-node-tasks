const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')

const { userOne, userTwo, taskOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create a task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'From my test'
    })
    .expect(201)

  const task = await Task.findById(response.body._id)
  expect(task).not.toBeNull()
  expect(task.completed).toEqual(false)
})

test('Fetch user tasks', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  expect(response.body.length).toEqual(2)
})

test('Only task owner should be able to delete a task', async () => {
  await request(app)
    .delete(`/task/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

  const task = Task.findById(taskOne._id)
  expect(task).not.toBeNull()
})
