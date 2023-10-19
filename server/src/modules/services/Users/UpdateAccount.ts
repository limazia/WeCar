import { compare, genSaltSync, hashSync } from 'bcrypt'

import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { messages } from '@helpers/constants/messages'

interface IRequest {
  scope?: string;
  id: string;
  name?: string;
  email?: string;
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
}

class UpdateAccount {
  public async execute({
    scope,
    id,
    name,
    email,
    password,
    newPassword,
    confirmPassword
  }: IRequest): Promise<void> {
    const allowedScopes = ['name', 'email', 'password']
    const user = await connection('users').where({ id }).first()

    if (!user) {
      throw new AppError(messages.error.NO_USER_FOUND_WITH_THIS_ID)
    }

    if (allowedScopes.includes(scope)) {
      if (scope === 'name') {
        user.name = name

        await connection('users').update(user).where({ id })
      }

      if (scope === 'email') {
        const existingUserWithEmail = email && await connection('users').where({ email }).first()

        if (existingUserWithEmail) {
          throw new AppError(messages.error.form.EMAIL_ALREADY_REGISTERED)
        }

        user.email = email

        await connection('users').update(user).where({ id })
      }

      if (scope === 'password') {
        let isPassword = user.password

        if (password && newPassword && confirmPassword) {
          const isPasswordValid = await compare(password, user.password)

          if (isPasswordValid) {
            if (newPassword === confirmPassword) {
              const salt = genSaltSync(10)
              isPassword = hashSync(newPassword, salt)
            } else {
              throw new AppError(messages.error.form.PASSWORDS_DONT_MATCH)
            }
          } else {
            throw new AppError(messages.error.form.INVALID_PASSWORD)
          }
        }

        await connection('users').update({ password: isPassword }).where({ id })
      }
    } else {
      throw new AppError(messages.error.TYPE_NOT_IDENTIFIED_IN_ALLOWED_SCOPE)
    }
  }
}

export { UpdateAccount }
