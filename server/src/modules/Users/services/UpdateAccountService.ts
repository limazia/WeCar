import { compare, genSaltSync, hashSync } from 'bcrypt'

import { messages } from '@shared/helpers/constants/messages'
import { AppError } from '@shared/errors/AppError'
import { connection } from '@shared/knex'

interface IRequest {
  scope?: string;
  id: string;
  name?: string;
  email?: string;
  password?: string;
  new_password?: string;
  confirm_password?: string;
}

class UpdateAccountService {
  public async updateName({ id, name }: IRequest): Promise<void> {
    const user = await connection('users').where({ id }).first()

    if (!user) {
      throw new AppError(messages.error.NO_USER_FOUND_WITH_THIS_ID)
    }

    let updatedName = user.name

    if (name) {
      if (name !== user.name) {
        updatedName = name
      }
    } else {
      throw new AppError(messages.error.input.ENTER_NAME)
    }

    await connection('users').update({ name: updatedName }).where({ id })
  }

  public async updateEmail({ id, email }: IRequest): Promise<void> {
    const user = await connection('users').where({ id }).first()
    const existingUserWithEmail = email && await connection('users').where({ email }).first()

    if (!user) {
      throw new AppError(messages.error.NO_USER_FOUND_WITH_THIS_ID)
    }

    let isEmail = user.email

    if (email) {
      if (email !== user.email) {
        if (existingUserWithEmail) {
          throw new AppError(messages.error.form.EMAIL_ALREADY_REGISTERED)
        } else {
          isEmail = email
        }
      }
    } else {
      throw new AppError(messages.error.input.ENTER_EMAIL)
    }

    await connection('users').update({ email: isEmail }).where({ id })
  }

  public async updatePassword({
    id,
    password,
    new_password,
    confirm_password
  }: IRequest): Promise<void> {
    const user = await connection('users').where({ id }).first()

    if (!user) {
      throw new AppError(messages.error.NO_USER_FOUND_WITH_THIS_ID)
    }

    let isPassword = user.password

    if (password && new_password && confirm_password) {
      const isPasswordValid = await compare(password, user.password)

      if (isPasswordValid) {
        if (new_password === confirm_password) {
          const salt = genSaltSync(10)
          isPassword = hashSync(new_password, salt)
        } else {
          throw new AppError(messages.error.form.PASSWORDS_DONT_MATCH)
        }
      } else {
        throw new AppError(messages.error.form.INVALID_PASSWORD)
      }
    }

    await connection('users').update({ password: isPassword }).where({ id })
  }

  public async execute({
    scope,
    id,
    name,
    email,
    password,
    new_password,
    confirm_password
  }: IRequest): Promise<void> {
    const allowedScopes = ['name', 'email', 'password']

    if (allowedScopes.includes(scope)) {
      switch (scope) {
        case 'name':
          this.updateName({ id, name })
          break
        case 'email':
          this.updateEmail({ id, email })
          break
        case 'password':
          this.updatePassword({ id, password, new_password, confirm_password })
          break
        default:
          throw new AppError(messages.error.TYPE_NOT_IDENTIFIED_IN_ALLOWED_SCOPE)
      }
    } else {
      throw new AppError(messages.error.TYPE_NOT_IDENTIFIED_IN_ALLOWED_SCOPE)
    }
  }
}

export { UpdateAccountService }
