import { genSaltSync, hashSync } from 'bcrypt'

import { AppError } from '@shared/errors/AppError'
import { generateUUID } from '@shared/helpers/generateUUID'

import { connection } from '@shared/knex'
import { messages } from '@shared/helpers/constants/messages'

interface IRequest {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  permissions: { value: string }[];
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    confirm_password,
    permissions
  }: IRequest): Promise<void> {
    const emailExists = await connection('users').where({ email }).first()

    if (emailExists) {
      throw new AppError(messages.error.form.EMAIL_ALREADY_REGISTERED)
    }

    if (!name) {
      throw new AppError(messages.error.input.ENTER_NAME)
    }

    if (!email) {
      throw new AppError(messages.error.input.ENTER_EMAIL)
    }

    if (!password) {
      throw new AppError(messages.error.input.ENTER_PASSWORD)
    }

    if (password !== confirm_password) {
      throw new AppError(messages.error.form.PASSWORDS_DONT_MATCH)
    }

    const id = generateUUID()
    const salt = genSaltSync(10)
    const passwordHash = hashSync(password, salt)

    const formattedPermissions = permissions.map(({ value }) => value).toString()

    await connection('users').insert({
      id,
      name,
      email,
      password: passwordHash,
      permissions: formattedPermissions,
    })
  }
}

export { CreateUserService }
