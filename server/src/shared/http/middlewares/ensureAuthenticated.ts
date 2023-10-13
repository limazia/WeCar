import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { auth } from '@config/auth'
import { messages } from '@shared/helpers/constants/messages'
import { AppError } from '@shared/errors/AppError'

interface IPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError(messages.error.NO_TOKEN_PROVIDED)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(token, auth.jwt.secret) as IPayload

    request.user = {
      id: sub
    }

    return next()
  } catch (err) {
    throw new AppError(messages.error.INVALID_TOKEN)
  }
}
