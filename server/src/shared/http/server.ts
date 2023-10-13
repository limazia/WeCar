import 'dotenv/config'
import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'

import { routes } from './routes'

import { connection } from '@shared/knex'
import { AppError } from '@shared/errors/AppError'

const app = express()

connection.raw('SELECT 1')
  .then(() => {
    console.log(`🌎 Environment: ${process.env.NODE_ENV}`)
    console.log('📦 Database successfully connected')

    const URL = 'http://localhost'
    const PORT = process.env.APP_PORT || 3001

    app.use(cors())
    app.use(express.json())
    app.use(routes)

    app.use(async (error: Error, request: Request, response: Response, next: NextFunction) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        })
      }

      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    })

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${URL}:${PORT}`)
    })
  })
  .catch(() => console.log('❌ Database connection error'))
