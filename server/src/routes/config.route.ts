import { Router } from 'express'

import { configController } from '@modules/controllers/ConfigController'

export const configRouter = Router()

configRouter.get('/', configController.index)
configRouter.put('/', configController.update)
