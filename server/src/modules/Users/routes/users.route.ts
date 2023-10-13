import { Router } from 'express'

import { ensureAuthenticated } from '@shared/http/middlewares/ensureAuthenticated'
import { userController } from '../controllers/UserController'

export const usersRouter = Router()

usersRouter.use(ensureAuthenticated)

usersRouter.get('/', userController.index)
usersRouter.post('/', userController.create)
usersRouter.get('/:id', userController.findById)
usersRouter.put('/:id', userController.update)
usersRouter.delete('/:id', userController.delete)
