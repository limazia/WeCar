import { connection } from '@knex/index'

import { moment } from '@helpers/moment'

import { User } from '@modules/models/User'

interface IResponse {
  results: User[];
}

class ListUsers {
  public async execute(): Promise<IResponse> {
    const users = await connection('users')
      .select([
        'users.*',
        'groups.group_name as group_name',
        'groups.group_permissions as group_permissions',
      ])
      .leftJoin('groups', 'users.id_group', '=', 'groups.group_id')
      .orderBy('users.created_at', 'desc')
      .where('users.is_deleteable', 1)

    const serializedItems = users.map(({
      is_deleteable,
      group_name,
      group_permissions,
      updated_at,
      created_at,
      ...rest
    }) => ({
      ...rest,
      role: group_name,
      permissions: group_permissions ? group_permissions.split(',').map(permission => permission.trim()) : [],
      is_deleteable: Boolean(is_deleteable),
      updated_at: moment(updated_at).format('L'),
      created_at: moment(created_at).format('L'),
    }))

    return {
      results: serializedItems,
    }
  }
}

export { ListUsers }
