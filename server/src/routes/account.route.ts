import { Router } from 'express'

import { ensureAuthenticated } from '@modules/middlewares/ensureAuthenticated'

import { accountController } from '@modules/controllers/AccountController'

export const accountRouter = Router()

accountRouter.use(ensureAuthenticated)

accountRouter.get('/account', accountController.account)
accountRouter.put('/:scope/:id', accountController.updateByScope)
