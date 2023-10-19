import { Router } from 'express'

import { carController } from '@modules/controllers/CarController'

export const carsRouter = Router()

carsRouter.get('/', carController.index)
carsRouter.post('/', carController.create)
carsRouter.get('/b/:brand_slug', carController.listByBrandSlug)
carsRouter.get('/b/:brand_slug/:model_slug', carController.listByBrandAndModelSlug)
carsRouter.get('/:car_id', carController.findById)
carsRouter.put('/:car_id', carController.update)
carsRouter.delete('/:car_id', carController.delete)
