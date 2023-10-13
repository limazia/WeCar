import { Router } from 'express'

import { brandsRouter } from '@modules/Brand/routes/brands.route'
import { modelsRouter } from '@modules/Models/routes/models.route'
import { carsRouter } from '@modules/Cars/routes/cars.route'
import { groupsRouter } from '@modules/Groups/routes/groups.route'
import { usersRouter } from '@modules/Users/routes/users.route'
import { sessionsRouter } from '@modules/Users/routes/sessions.route'
import { accountRouter } from '@modules/Users/routes/account.route'

export const routes = Router()

routes.get('/', function (request, response) {
  response.json({
    name: 'WeCar',
    environment: process.env.NODE_ENV,
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
