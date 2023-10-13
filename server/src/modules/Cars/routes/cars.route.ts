import { Router } from 'express'

import { validate } from '@shared/helpers/validate'

import { carController } from '../controllers/CarController'
import { CarSchema, ByBrandSchema, ByIdSchema } from './schemas'

export const carsRouter = Router()

carsRouter.get('/', carController.index)
carsRouter.post('/', validate(CarSchema), carController.create)
carsRouter.get('/:brand/:model', validate(ByBrandSchema), carController.listByBrand)
carsRouter.get('/:car_id', validate(ByIdSchema), carController.findById)
carsRouter.put('/:car_id', validate(ByIdSchema), carController.update)
carsRouter.delete('/:car_id', validate(ByIdSchema), carController.delete)
