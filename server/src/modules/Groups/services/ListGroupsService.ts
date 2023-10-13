import { connection } from '@shared/knex'
import { moment } from '@shared/helpers/moment'

import { Group } from '../interfaces/Group'

interface IResponse {
  results: Group[];
}

class ListGroupsService {
  public async execute(): Promise<IResponse> {
    const groups = await connection('groups').orderBy('created_at', 'asc')

    const serializedItems = groups.map(({
      group_permissions,
      is_deleteable,
      updated_at,
      created_at,
      ...rest
    }) => ({
      ...rest,
      group_permissions: group_permissions ? (group_permissions as string).split(',').map(permission => permission.trim()) : [],
      is_deleteable: Boolean(is_deleteable),
      updated_at: moment(updated_at).format('L'),
      created_at: moment(created_at).format('L'),
    }))

    return {
      results: serializedItems,
    }
  }
}

export { ListGroupsService }
