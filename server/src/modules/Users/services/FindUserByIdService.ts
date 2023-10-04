import { connection } from '@shared/knex'
import { moment } from '@shared/helpers/moment'
import { AppError } from '@shared/errors/AppError'
import { messages } from '@shared/helpers/constants/messages'

import { User } from '../interfaces/User'

interface IRequest {
  id: string;
}

class FindUserByIdService {
  userResponse(user): User {
    const {
      id,
      name,
      email,
      permissions,
      updated_at,
      created_at
    } = user

    return {
      id,
      name,
      email,
      permissions: permissions ? (permissions as string).split(',').map(permission => permission.trim()) : [],
      updated_at: moment(updated_at).format('LL'),
      created_at: moment(created_at).format('LL'),
    }
  }

  public async execute({ id }: IRequest): Promise<User[]> {
    const user = await connection('users').where({ id }).first()

    if (!user) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    const formattedUser = this.userResponse(user)
    return [formattedUser]
  }
}

export { FindUserByIdService }
