import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Cars } from '.'

const app = () => express(routes)

let userSession, anotherSession, cars

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  cars = await Cars.create({ user })
})

test('POST /cars 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, make: 'test', model: 'test', color: 'test', year: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.make).toEqual('test')
  expect(body.model).toEqual('test')
  expect(body.color).toEqual('test')
  expect(body.year).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /cars 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /cars 200 (user)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /cars 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /cars/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${cars.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cars.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /cars/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${cars.id}`)
  expect(status).toBe(401)
})

test('GET /cars/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /cars/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${cars.id}`)
    .send({ access_token: userSession, make: 'test', model: 'test', color: 'test', year: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cars.id)
  expect(body.make).toEqual('test')
  expect(body.model).toEqual('test')
  expect(body.color).toEqual('test')
  expect(body.year).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /cars/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${cars.id}`)
    .send({ access_token: anotherSession, make: 'test', model: 'test', color: 'test', year: 'test' })
  expect(status).toBe(401)
})

test('PUT /cars/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${cars.id}`)
  expect(status).toBe(401)
})

test('PUT /cars/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: anotherSession, make: 'test', model: 'test', color: 'test', year: 'test' })
  expect(status).toBe(404)
})

test('DELETE /cars/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${cars.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /cars/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${cars.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /cars/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${cars.id}`)
  expect(status).toBe(401)
})

test('DELETE /cars/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
