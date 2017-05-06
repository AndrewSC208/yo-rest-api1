import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Cars } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Cars.create({ ...body, user })
    .then((cars) => cars.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Cars.find(query, select, cursor)
    .populate('user')
    .then((cars) => cars.map((cars) => cars.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Cars.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((cars) => cars ? cars.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Cars.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((cars) => cars ? _.merge(cars, body).save() : null)
    .then((cars) => cars ? cars.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Cars.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((cars) => cars ? cars.remove() : null)
    .then(success(res, 204))
    .catch(next)
