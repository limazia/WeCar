import { Router } from 'express'

import { validate } from '@shared/helpers/validate'
import { ensureAuthenticated } from '@shared/http/middlewares/ensureAuthenticated'

import { accountController } from '../controllers/AccountController'
import { UpdateSchema } from './schemas'

export const accountRouter = Router()

accountRouter.use(ensureAuthenticated)

accountRouter.get('/account', accountController.account)
accountRouter.put('/:scope/:id', validate(UpdateSchema), accountController.updateByScope)
