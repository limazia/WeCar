import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { AppError } from '@shared/errors/AppError'
import { messages } from '@shared/helpers/constants/messages'
import { connection } from '@shared/knex'
import { auth } from '@config/auth'

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  type: string;
  token: string;
  refreshToken: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await connection('users').where({ email }).first()

    if (!user) {
      throw new AppError(messages.error.form.THE_EMAIL_YOU_ENTERED_IS_NOT_LINKED_TO_AN_ACCOUNT, 401)
    }

    if (!email) {
      throw new AppError(messages.error.input.COMPLETE_FIELD)
    }

    if (!password) {
      throw new AppError(messages.error.input.COMPLETE_FIELD)
    }

    if (!(await compare(password, user.password))) {
      throw new AppError(messages.error.form.INVALID_EMAIL_PASSWORD)
    }

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    })

    return {
      type: 'bearer',
      token,
      refreshToken: null
    }
  }
}

export { CreateSessionService }
