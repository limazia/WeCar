import { genSaltSync, hashSync } from 'bcrypt'

import { AppError } from '@shared/errors/AppError'
import { generateUUID } from '@shared/helpers/generateUUID'

import { connection } from '@shared/knex'
import { messages } from '@shared/helpers/constants/messages'

interface IRequest {
  name: string;
  email: string;
  id_group: string;
  password: string;
  confirmPassword: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    id_group,
    password,
    confirmPassword
  }: IRequest): Promise<void> {
    const emailExists = await connection('users').where({ email }).first()

    if (emailExists) {
      throw new AppError(messages.error.form.EMAIL_ALREADY_REGISTERED)
    }

    if (!name) {
      throw new AppError(messages.error.input.COMPLETE_FIELD)
    }

    if (!email) {
      throw new AppError(messages.error.input.COMPLETE_FIELD)
    }

    if (!id_group) {
      throw new AppError(messages.error.input.COMPLETE_FIELD)
    }

    if (!password) {
      throw new AppError(messages.error.input.COMPLETE_FIELD)
    }

    if (password !== confirmPassword) {
      throw new AppError(messages.error.form.PASSWORDS_DONT_MATCH)
    }

    const id = generateUUID()
    const salt = genSaltSync(10)
    const passwordHash = hashSync(password, salt)

    await connection('users').insert({
      id,
      name,
      email,
      id_group,
      password: passwordHash,
    })
  }
}

export { CreateUserService }
