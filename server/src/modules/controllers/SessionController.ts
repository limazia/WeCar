import { Request, Response } from 'express'

import { CreateSession } from '@modules/services/Users/CreateSession'

class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const createSession = new CreateSession()

    const { type, token, refreshToken } = await createSession.execute({
      email,
      password
    })

    return response.json({ type, token, refreshToken })
  }
}

export const sessionController = new SessionController()
