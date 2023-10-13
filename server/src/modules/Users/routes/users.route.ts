import { Router } from 'express'

import { validate } from '@shared/helpers/validate'
import { ensureAuthenticated } from '@shared/http/middlewares/ensureAuthenticated'

import { userController } from '../controllers/UserController'
import { UserSchema, ByIdSchema } from './schemas'

export const usersRouter = Router()

usersRouter.use(ensureAuthenticated)

usersRouter.get('/', userController.index)
usersRouter.post('/', validate(UserSchema), userController.create)
usersRouter.get('/:id', validate(ByIdSchema), userController.findById)
usersRouter.put('/:id', validate(ByIdSchema), userController.update)
usersRouter.delete('/:id', validate(ByIdSchema), userController.delete)
