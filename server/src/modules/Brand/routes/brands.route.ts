import { Router } from 'express'

import { validate } from '@shared/helpers/validate'

import { brandController } from '../controllers/BrandController'
import { CarSchema, ByBrandSchema, ByIdSchema } from './schemas'

export const brandsRouter = Router()

brandsRouter.get('/', brandController.index)
brandsRouter.post('/', validate(CarSchema), brandController.create)
brandsRouter.get('/b/:brand', validate(ByBrandSchema), brandController.listByBrand)
brandsRouter.get('/:brand_id', validate(ByIdSchema), brandController.findById)
brandsRouter.put('/:brand_id', validate(ByIdSchema), brandController.update)
brandsRouter.delete('/:brand_id', validate(ByIdSchema), brandController.delete)
