import request from 'supertest-as-promised'
import { masterKey } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Person } from '.'

const app = () => express(routes)

let userSession, adminSession, person

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  person = await Person.create({})
})

test('POST /people 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: adminSession, name: 'test', height: 'test', age: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.height).toEqual('test')
  expect(body.age).toEqual('test')
})

test('POST /people 401 (user)', async () => {
  const { status } = await request(app())
    .post('/')
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /people 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /people 200 (user)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /people 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /people/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${person.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(person.id)
})

test('GET /people/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${person.id}`)
  expect(status).toBe(401)
})

test('GET /people/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /people/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`/${person.id}`)
    .send({ access_token: adminSession, name: 'test', height: 'test', age: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(person.id)
  expect(body.name).toEqual('test')
  expect(body.height).toEqual('test')
  expect(body.age).toEqual('test')
})

test('PUT /people/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`/${person.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /people/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${person.id}`)
  expect(status).toBe(401)
})

test('PUT /people/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', height: 'test', age: 'test' })
  expect(status).toBe(404)
})

test('DELETE /people/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`/${person.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /people/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`/${person.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /people/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${person.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /people/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${person.id}`)
  expect(status).toBe(401)
})

test('DELETE /people/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
