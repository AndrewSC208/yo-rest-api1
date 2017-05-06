import { Person } from '.'

let person

beforeEach(async () => {
  person = await Person.create({ name: 'test', height: 'test', age: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = person.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(person.id)
    expect(view.name).toBe(person.name)
    expect(view.height).toBe(person.height)
    expect(view.age).toBe(person.age)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = person.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(person.id)
    expect(view.name).toBe(person.name)
    expect(view.height).toBe(person.height)
    expect(view.age).toBe(person.age)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
