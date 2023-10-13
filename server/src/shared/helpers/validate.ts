import { Request, Response, NextFunction } from 'express'

export const validate = (schema) => (request: Request, response: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: request.body,
      query: request.query,
      params: request.params,
    })

    next()
  } catch (err) {
    return response.status(400).send(err.errors)
  }
}
