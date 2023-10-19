import { connection } from '@knex/index'

import { AppError } from '@helpers/AppError'
import { messages } from '@helpers/constants/messages'
import { moment } from '@helpers/moment'

import { User } from '@modules/models/User'

interface IRequest {
  id: string;
}

class FindUserById {
  public async execute({ id }: IRequest): Promise<User> {
    const user = await connection('users')
      .select([
        'users.*',
        'groups.group_id as group_id',
        'groups.group_name as group_name',
        'groups.group_permissions as group_permissions',
      ])
      .leftJoin('groups', 'users.id_group', '=', 'groups.group_id').where({ id }).first()

    if (!user) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    const {
      name,
      email,
      is_deleteable,
      group_id,
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
      role_id: group_id,
      role: group_name,
      permissions: group_permissions ? group_permissions.split(',').map(permission => permission.trim()) : [],
      updated_at: moment(updated_at).format('DD [de] MMMM, YYYY'),
      created_at: moment(created_at).format('DD [de] MMMM, YYYY'),
    }
  }
}

export { FindUserById }
