import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Cars, { schema } from './model'

const router = new Router()
const { make, model, color, year } = schema.tree

/**
 * @api {post} /cars Create cars
 * @apiName CreateCars
 * @apiGroup Cars
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam make Cars's make.
 * @apiParam model Cars's model.
 * @apiParam color Cars's color.
 * @apiParam year Cars's year.
 * @apiSuccess {Object} cars Cars's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cars not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ make, model, color, year }),
  create)

/**
 * @api {get} /cars Retrieve cars
 * @apiName RetrieveCars
 * @apiGroup Cars
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} cars List of cars.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /cars/:id Retrieve cars
 * @apiName RetrieveCars
 * @apiGroup Cars
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} cars Cars's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cars not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /cars/:id Update cars
 * @apiName UpdateCars
 * @apiGroup Cars
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam make Cars's make.
 * @apiParam model Cars's model.
 * @apiParam color Cars's color.
 * @apiParam year Cars's year.
 * @apiSuccess {Object} cars Cars's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cars not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ make, model, color, year }),
  update)

/**
 * @api {delete} /cars/:id Delete cars
 * @apiName DeleteCars
 * @apiGroup Cars
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Cars not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
