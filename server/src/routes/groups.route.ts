import { Router } from 'express'

import { ensureAuthenticated } from '@modules/middlewares/ensureAuthenticated'
import { groupController } from '@modules/controllers/GroupController'

export const groupsRouter = Router()

groupsRouter.use(ensureAuthenticated)

groupsRouter.get('/', groupController.index)
groupsRouter.post('/', groupController.create)
groupsRouter.get('/:group_id', groupController.findById)
groupsRouter.put('/:group_id', groupController.update)
groupsRouter.delete('/:group_id', groupController.delete)
