import { Router } from 'express'

import { sessionController } from '../controllers/SessionController'

export const sessionsRouter = Router()

sessionsRouter.post('/login', sessionController.create)
