import { messages } from '@shared/helpers/constants/messages'
import { AppError } from '@shared/errors/AppError';
import { connection } from '@shared/knex'

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  permissions: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
    confirm_password,
    permissions
  }: IRequest): Promise<void> {
    const user = await connection('users').where({ id }).first()

    if(!user) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    user.id = id
    user.name = name
    user.email = email
    user.password = password
    user.confirm_password = confirm_password
    user.permissions = permissions

    await connection('users').update(user).where({ id })
  }
}

export { UpdateUserService }
