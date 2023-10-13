import { Router } from 'express'

import { ensureAuthenticated } from '@shared/http/middlewares/ensureAuthenticated'

import { accountController } from '../controllers/AccountController'

export const accountRouter = Router()

accountRouter.use(ensureAuthenticated)

accountRouter.get('/account', accountController.account)
accountRouter.put('/:scope/:id', accountController.updateByScope)
