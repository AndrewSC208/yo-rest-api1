import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Person, { schema } from './model'

const router = new Router()
const { name, height, age } = schema.tree

/**
 * @api {post} /people Create person
 * @apiName CreatePerson
 * @apiGroup Person
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Person's name.
 * @apiParam height Person's height.
 * @apiParam age Person's age.
 * @apiSuccess {Object} person Person's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Person not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, height, age }),
  create)

/**
 * @api {get} /people Retrieve people
 * @apiName RetrievePeople
 * @apiGroup Person
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} people List of people.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /people/:id Retrieve person
 * @apiName RetrievePerson
 * @apiGroup Person
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} person Person's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Person not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /people/:id Update person
 * @apiName UpdatePerson
 * @apiGroup Person
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Person's name.
 * @apiParam height Person's height.
 * @apiParam age Person's age.
 * @apiSuccess {Object} person Person's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Person not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, height, age }),
  update)

/**
 * @api {delete} /people/:id Delete person
 * @apiName DeletePerson
 * @apiGroup Person
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Person not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
