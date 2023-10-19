import { genSaltSync, hashSync } from 'bcrypt'

import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { messages } from '@helpers/constants/messages'

interface IRequest {
  id: string;
  name: string;
  email: string;
  id_group: string;
  newPassword: string;
  confirmPassword: string;
}

class UpdateUser {
  public async execute({
    id,
    name,
    email,
    id_group,
    newPassword,
    confirmPassword
  }: IRequest): Promise<void> {
    const user = await connection('users').where({ id }).first()

    if (!user) {
      throw new AppError(messages.error.NO_USER_FOUND_WITH_THIS_ID)
    }

    user.id = id
    user.name = name
    user.email = email
    user.id_group = id_group

    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        const salt = genSaltSync(10)
        user.password = id_group = hashSync(newPassword, salt)
      } else {
        throw new AppError(messages.error.form.PASSWORDS_DONT_MATCH)
      }
    }

    await connection('users').update(user).where({ id })
  }
}

export { UpdateUser }
