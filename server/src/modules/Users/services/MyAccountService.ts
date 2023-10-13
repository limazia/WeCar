import { connection } from '@shared/knex'
import { moment } from '@shared/helpers/moment'
import { AppError } from '@shared/errors/AppError'
import { messages } from '@shared/helpers/constants/messages'

import { User } from '../interfaces/User'

interface IRequest {
  id: string;
}

class MyAccountService {
  userResponse(user): User {
    const {
      id,
      name,
      email,
      is_deleteable,
      group_name,
      group_permissions,
      updated_at,
      created_at
    } = user

    return {
      id,
      name,
      email,
      is_deleteable: Boolean(is_deleteable),
      group: {
        name: group_name,
        permissions: group_permissions ? (group_permissions as string).split(',').map(permission => permission.trim()) : [],
      },
      updated_at: moment(updated_at).format('DD [de] MMMM, YYYY'),
      created_at: moment(created_at).format('DD [de] MMMM, YYYY'),
    }
  }

  public async execute({ id }: IRequest): Promise<User[]> {
    const user = await connection('users')
      .select([
        'users.*',
        'groups.group_name as group_name',
        'groups.group_permissions as group_permissions',
      ])
      .leftJoin('groups', 'users.id_group', '=', 'groups.group_id').where({ id }).first()

    if (!user) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    const formattedUser = this.userResponse(user)
    return [formattedUser]
  }
}

export { MyAccountService }


