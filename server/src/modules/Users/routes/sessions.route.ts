import { Router } from 'express'

import { validate } from '@shared/helpers/validate'

import { sessionController } from '../controllers/SessionController'
import { SessionSchema } from './schemas'

export const sessionsRouter = Router()

sessionsRouter.post('/login', validate(SessionSchema), sessionController.create)
