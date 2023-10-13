import { Router } from 'express'

import { validate } from '@shared/helpers/validate'

import { modelController } from '../controllers/ModelController'
import { ModelSchema, ByIdSchema } from './schemas'

export const modelsRouter = Router()

modelsRouter.get('/', modelController.index)
modelsRouter.post('/', validate(ModelSchema), modelController.create)
modelsRouter.get('/:model_id', validate(ByIdSchema), modelController.findById)
modelsRouter.put('/:model_id', validate(ByIdSchema), modelController.update)
modelsRouter.delete('/:model_id', validate(ByIdSchema), modelController.delete)
