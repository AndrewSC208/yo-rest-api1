import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Person } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Person.create(body)
    .then((person) => person.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Person.find(query, select, cursor)
    .then((people) => people.map((person) => person.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Person.findById(params.id)
    .then(notFound(res))
    .then((person) => person ? person.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Person.findById(params.id)
    .then(notFound(res))
    .then((person) => person ? _.merge(person, body).save() : null)
    .then((person) => person ? person.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Person.findById(params.id)
    .then(notFound(res))
    .then((person) => person ? person.remove() : null)
    .then(success(res, 204))
    .catch(next)
