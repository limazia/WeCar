import { Router } from 'express'

import { modelController } from '@modules/controllers/ModelController'

export const modelsRouter = Router()

modelsRouter.get('/', modelController.index)
modelsRouter.post('/', modelController.create)
modelsRouter.get('/b/:brand_slug', modelController.listByBrandSlug)
modelsRouter.get('/:model_id', modelController.findById)
modelsRouter.put('/:model_id', modelController.update)
modelsRouter.delete('/:model_id', modelController.delete)
