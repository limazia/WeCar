import { connection } from '@shared/knex'
import { moment } from '@shared/helpers/moment'

import { User } from '../interfaces/User'

interface IResponse {
  results: User[];
}

class ListUsersService {
  public async execute(): Promise<IResponse> {
    const users = await connection('users')
      .select([
        'users.*',
        'groups.group_name as group_name',
        'groups.group_permissions as group_permissions',
      ])
      .leftJoin('groups', 'users.id_group', '=', 'groups.group_id')
      .orderBy('users.created_at', 'desc')


    const serializedItems = users.map(({
      is_deleteable,
      group_name,
      group_permissions,
      updated_at,
      created_at,
      ...rest
    }) => ({
      ...rest,
      is_deleteable: Boolean(is_deleteable),
      group: {
        name: group_name,
        permissions: group_permissions ? (group_permissions as string).split(',').map(permission => permission.trim()) : [],
      },
      updated_at: moment(updated_at).format('L'),
      created_at: moment(created_at).format('L'),
    }))

    return {
      results: serializedItems,
    }
  }
}

export { ListUsersService }
