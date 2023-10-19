import { Router } from 'express'

import { brandsRouter } from './brands.route'
import { modelsRouter } from './models.route'
import { carsRouter } from './cars.route'
import { groupsRouter } from './groups.route'
import { usersRouter } from './users.route'
import { sessionsRouter } from './sessions.route'
import { accountRouter } from './account.route'

export const routes = Router()

routes.get('/', function (request, response) {
  response.json({
    name: 'WeCar',
    environment: process.env.APP_ENV,
    technologies: ['Node.js', 'MySQL', 'React'],
  })
})

routes.use('/api/brands', brandsRouter)
routes.use('/api/models', modelsRouter)
routes.use('/api/cars', carsRouter)
routes.use('/api/groups', groupsRouter)
routes.use('/api/users', usersRouter)
routes.use('/api/auth', sessionsRouter)
routes.use('/api/me/', accountRouter)
