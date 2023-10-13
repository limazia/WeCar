import { connection } from '@shared/knex'
import { moment } from '@shared/helpers/moment'
import { AppError } from '@shared/errors/AppError'
import { messages } from '@shared/helpers/constants/messages'

import { Group } from '../interfaces/Group'

interface IRequest {
  group_id: string;
}

class FindGroupByIdService {
  groupResponse(group): Group {
    const {
      group_id,
      group_name,
      group_permissions,
      is_deleteable,
      updated_at,
      created_at
    } = group

    return {
      group_id,
      group_name,
      group_permissions,
      is_deleteable: Boolean(is_deleteable),
      updated_at: moment(updated_at).format('LL'),
      created_at: moment(created_at).format('LL'),
    }
  }

  public async execute({ group_id }: IRequest): Promise<Group[]> {
    const group = await connection('groups').where({ group_id }).first()

    if (!group) {
      throw new AppError(messages.error.NO_ITEM_FOUND_WITH_THIS_ID)
    }

    const formattedGroup = this.groupResponse(group)
    return [formattedGroup]
  }
}

export { FindGroupByIdService }
