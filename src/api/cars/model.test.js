import { Cars } from '.'
import { User } from '../user'

let user, cars

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  cars = await Cars.create({ user, make: 'test', model: 'test', color: 'test', year: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = cars.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cars.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.make).toBe(cars.make)
    expect(view.model).toBe(cars.model)
    expect(view.color).toBe(cars.color)
    expect(view.year).toBe(cars.year)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = cars.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cars.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.make).toBe(cars.make)
    expect(view.model).toBe(cars.model)
    expect(view.color).toBe(cars.color)
    expect(view.year).toBe(cars.year)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
