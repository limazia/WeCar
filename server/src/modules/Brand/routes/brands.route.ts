import { Router } from 'express'

import { brandController } from '../controllers/BrandController'

export const brandsRouter = Router()

brandsRouter.get('/', brandController.index)
brandsRouter.post('/', brandController.create)
brandsRouter.get('/:brand_id', brandController.findById)
brandsRouter.put('/:brand_id', brandController.update)
brandsRouter.delete('/:brand_id', brandController.delete)
